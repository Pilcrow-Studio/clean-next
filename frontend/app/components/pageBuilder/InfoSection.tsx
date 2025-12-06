import {type PortableTextBlock} from 'next-sanity'
import PortableText from '../PortableText'

interface InfoSectionProps {
  heading?: string
  subheading?: string
  content?: any
  _key?: string
  pageId?: string
  pageType?: string
}

export default function InfoSection({
  heading,
  subheading,
  content,
  _key,
  pageId,
  pageType,
}: InfoSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto max-w-4xl px-4">
        {subheading && (
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-2 font-medium">
            {subheading}
          </p>
        )}
        {heading && (
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
            {heading}
          </h2>
        )}
        {content && (
          <div className="prose prose-lg max-w-none">
            <PortableText
              value={content as PortableTextBlock[]}
              documentId={pageId}
              documentType={pageType}
              fieldPath={_key ? `pageBuilder[_key=="${_key}"].content` : 'content'}
            />
          </div>
        )}
      </div>
    </section>
  )
}
