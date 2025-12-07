import Link from 'next/link'

interface CallToActionProps {
  _type?: string
  _key?: string
  heading?: string
  text?: string
  buttonText?: string
  link?: {
    _type: string
    page?: string
    post?: string
    href?: string
  } | null
  pageId?: string
  pageType?: string
}

export default function CallToAction({ heading, text, buttonText, link }: CallToActionProps) {
  const href = link?.page ? `/${link.page}` : link?.post ? `/posts/${link.post}` : link?.href || '#'

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-4xl text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          {heading}
        </h2>
        {text && (
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {text}
          </p>
        )}
        {buttonText && link && (
          <Link
            href={href}
            className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  )
}
