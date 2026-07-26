import { useEffect, useRef, useState } from 'react'
import { FRAME_COUNT, FRAME_URLS, frameIndices } from './frames'
import { LOADER } from './config'

/**
 * Loads one image, resolving either way.
 *
 * A rejected promise would stall the queue behind it, and a missing frame is
 * survivable — `nearestLoaded` covers the hole. So failure is a resolve with
 * nothing written to the store.
 */
function loadImage(store, index, url, priority) {
  return new Promise((resolve) => {
    const image = new Image()
    image.decoding = 'async'
    // Chrome honours this; everywhere else it is an inert property assignment.
    image.fetchPriority = priority

    image.onload = () => {
      store[index] = image
      resolve()
    }
    image.onerror = () => resolve()
    image.src = url
  })
}

/**
 * Runs an ordered queue of indices with a fixed number of lanes.
 *
 * Lanes pull from a shared cursor rather than being handed fixed slices, so one
 * slow response cannot leave the other lanes idle while frames further down the
 * queue wait.
 */
function runQueue(indices, concurrency, load, isCancelled) {
  let cursor = 0

  const lane = async () => {
    while (!isCancelled() && cursor < indices.length) {
      const index = indices[cursor]
      cursor += 1
      await load(index)
    }
  }

  return Promise.all(Array.from({ length: Math.min(concurrency, indices.length) }, lane))
}

/**
 * The nearest frame to `index` that has actually decoded, searched outward in
 * both directions.
 *
 * This is what makes progressive loading invisible. If the reader scrolls
 * faster than the network, the canvas shows the closest real frame rather than
 * nothing — the orbit stutters slightly instead of going black, and repairs
 * itself as the queue catches up.
 *
 * Searching backwards only (the obvious version) fails badly during loading:
 * scrolling past a gap would hold a frame from far behind rather than picking
 * up the already-loaded frame just ahead.
 *
 * @param {HTMLImageElement[]} store
 * @param {number} index
 * @returns {HTMLImageElement|null}
 */
export function nearestLoaded(store, index) {
  if (store[index]) return store[index]

  for (let distance = 1; distance < FRAME_COUNT; distance += 1) {
    const before = index - distance
    const after = index + distance
    if (before < 0 && after >= FRAME_COUNT) break
    if (before >= 0 && store[before]) return store[before]
    if (after < FRAME_COUNT && store[after]) return store[after]
  }

  return null
}

/**
 * Progressive, priority-tiered loader for the frame sequence.
 *
 * The whole point is that playback starts on frame one, not on frame 192. The
 * hero is interactive within a single image, and the remaining ~14MB arrives
 * underneath a scene the reader is already looking at.
 *
 * Three tiers:
 *   0. The first frame alone, at high priority, decoded before we report ready.
 *      `<link rel="preload">` in index.html has usually started it already.
 *   1. A useful neighbourhood — the next `primerCount` frames, normal priority.
 *   2. Everything else, at low priority, so it yields to fonts, CSS and the
 *      images of sections further down the page.
 *
 * React state is touched exactly twice for a 192-image sequence — `ready` and
 * `complete`. Per-frame progress would re-render the tree 192 times during the
 * most performance-sensitive moment of the page.
 *
 * @param {object} options
 * @param {number} options.step - 1 for every frame, 2 to decimate. See `frameIndices`.
 * @param {() => void} [options.onFrame] - Called after each frame lands, so the canvas can repaint.
 * @returns {{images: React.RefObject<HTMLImageElement[]>, ready: boolean, complete: boolean}}
 */
export function useFrameLoader({ step, onFrame }) {
  const images = useRef([])

  // Held in a ref so a caller passing an inline arrow does not restart the
  // entire download on every render.
  const onFrameRef = useRef(onFrame)
  useEffect(() => {
    onFrameRef.current = onFrame
  })

  const [status, setStatus] = useState({ ready: false, complete: false })

  useEffect(() => {
    let cancelled = false
    const isCancelled = () => cancelled

    // A fresh store per configuration, so a swap cannot blend two sequences.
    const store = []
    store.length = FRAME_COUNT
    images.current = store

    const load = async (index, priority) => {
      await loadImage(store, index, FRAME_URLS[index], priority)
      if (!cancelled) onFrameRef.current?.()
    }

    const run = async () => {
      const queue = frameIndices(step)
      const [first, ...rest] = queue

      await load(first, 'high')
      if (cancelled) return

      // Decoding here rather than at draw time keeps the first paint off the
      // main thread's critical path. Not fatal if unsupported or if it throws
      // on an image that failed — the draw path handles a missing frame.
      await store[first]?.decode?.().catch(() => {})
      if (cancelled) return
      setStatus({ ready: true, complete: rest.length === 0 })

      const primer = rest.slice(0, LOADER.primerCount)
      const tail = rest.slice(LOADER.primerCount)

      await runQueue(primer, LOADER.primerConcurrency, (i) => load(i, 'auto'), isCancelled)
      if (cancelled) return

      await runQueue(tail, LOADER.tailConcurrency, (i) => load(i, 'low'), isCancelled)
      if (cancelled) return

      setStatus({ ready: true, complete: true })
    }

    run()

    return () => {
      cancelled = true
    }
  }, [step])

  return { images, ready: status.ready, complete: status.complete }
}
