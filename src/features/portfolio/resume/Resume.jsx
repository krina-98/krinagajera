import { ActionLink, DownloadIcon, ExternalIcon, Section, Text } from '@/components/ui'
import { Reveal } from '@/components/motion'
import { profile } from '@/content'
import { SectionHeader } from '../SectionHeader'

/**
 * Resume — the PDF, previewed in place and downloadable.
 *
 * Renders nothing at all when `profile.resume` is null. A résumé section with
 * no résumé in it is worse than no section, and this way removing the file is
 * a one-line content change rather than an edit to `App.jsx`.
 *
 * `<object>` rather than `<iframe>`: its children are real fallback content,
 * shown by the browser whenever the PDF cannot be rendered inline. That is not
 * an edge case — most mobile browsers refuse to embed PDFs, so on a phone the
 * fallback IS the experience, and it has to be a working link rather than a
 * blank grey box.
 */
export function Resume() {
  if (!profile.resume) return null

  return (
    <Section id="resume" spacing="lg" container="wide" aria-labelledby="resume-title">
      {/* Nothing here counts the pages. An earlier version said "the one-page
          version", which is the kind of detail that quietly goes wrong the
          moment the file is updated — and did. The copy is written to survive
          any résumé dropped at `public/resume.pdf`. */}
      <SectionHeader
        index="04"
        id="resume-title"
        eyebrow="Resume"
        title={['The full version.']}
        lede="Read it here, or download a copy to keep."
      />

      <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-4">
        <ActionLink
          href={profile.resume}
          variant="outline"
          size="lg"
          className="rounded-full px-8"
          /* `download` asks the browser to save rather than navigate. It only
             works same-origin, which this is — the file is served from public/. */
          download
          leftIcon={<DownloadIcon />}
        >
          Download PDF
        </ActionLink>

        <ActionLink
          href={profile.resume}
          variant="text"
          size="lg"
          target="_blank"
          rightIcon={<ExternalIcon />}
        >
          Open in a new tab
        </ActionLink>
      </Reveal>

      <Reveal delay={0.2} className="mt-10">
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <object
            data={profile.resume}
            type="application/pdf"
            aria-label="Résumé preview"
            /* Tall enough to read a page of it without scrolling the container,
               capped so it never grows past the viewport on a large screen. */
            className="block h-[clamp(26rem,78vh,50rem)] w-full"
          >
            <div className="flex flex-col items-start gap-4 p-8">
              <Text variant="secondary" className="max-w-[46ch]">
                Your browser cannot display the PDF inline — most mobile browsers
                will not. Open or download it instead.
              </Text>
              <ActionLink
                href={profile.resume}
                variant="outline"
                size="md"
                className="rounded-full px-6"
                download
                leftIcon={<DownloadIcon />}
              >
                Download PDF
              </ActionLink>
            </div>
          </object>
        </div>
      </Reveal>
    </Section>
  )
}
