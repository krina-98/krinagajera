import { useEffect, useRef, useState } from 'react'

// Enough parallelism to fill the pipe, few enough that the first frames are not
// stuck behind 190 others competing for connections.
const BATCH = 10

/**
 * Progressive loader for an image sequence.
 *
 * Frames arrive in order and in small batches, so the first one paints almost
 * immediately and the rest fill in behind it.
 *
 * Returns the frame store as a ref rather than an array: the consumer reads it
 * inside an animation frame, never during render, and handing back a mutable
 * array would make that read a render-phase ref access.
 *
 * @param {string[]} urls - Frame sources, in playback order.
 * @returns {{frames: React.RefObject<HTMLImageElement[]>, loaded: number, ready: boolean, complete: boolean}}
 */
export function useFrameSequence(urls) {
  const frames = useRef([])
  const [loaded, setLoaded] = useState(0)

  useEffect(() => {
    let cancelled = false
    let count = 0

    // A fresh store per url set, so a swap cannot mix two sequences together.
    const store = new Array(urls.length)
    frames.current = store

    const load = (url, index) =>
      new Promise((resolve) => {
        const image = new Image()
        image.decoding = 'async'
        image.onload = () => {
          if (!cancelled) {
            store[index] = image
            count += 1
            setLoaded(count)
          }
          resolve()
        }
        // A dropped frame must not stall the sequence behind it.
        image.onerror = resolve
        image.src = url
      })

    const run = async () => {
      for (let start = 0; start < urls.length; start += BATCH) {
        if (cancelled) return
        const batch = urls.slice(start, start + BATCH)
        await Promise.all(batch.map((url, offset) => load(url, start + offset)))
      }
    }

    run()

    return () => {
      cancelled = true
    }
  }, [urls])

  return {
    frames,
    loaded,
    ready: loaded > 0,
    complete: loaded >= urls.length,
  }
}
