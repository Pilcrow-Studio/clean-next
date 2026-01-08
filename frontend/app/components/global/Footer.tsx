import Link from 'next/link'
import {footerQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import SanitySvg from '../ui/SanitySvg'

type Footer = {
  _id: string
  logo?: {
    asset?: {
      url?: string
      extension?: string
      mimeType?: string
    }
    alt?: string | null
  }
  companyName?: string | null
  linkColumns?: Array<{
    title?: string | null
    links?: Array<{
      text?: string | null
      slug?: string | null
    }> | null
  }> | null
  infoLinks?: Array<{
    text?: string | null
    slug?: string | null
  }> | null
}

export default async function Footer() {
  const {data} = await sanityFetch({
    query: footerQuery,
  })

  if (!data) {
    return null
  }

  const footer = data as Footer

  return (
    <footer className="bg-gray-50 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800 ">
      <div className="container py-12 md:py-16">
        {/* Top Section: Logo and Link Columns */}
        <div className="flex flex-wrap justify-between gap-8 mb-8">
          {/* Logo and Company Name */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-4 dark:text-white">
              {footer.logo?.asset?.url ? (
                <SanitySvg
                  url={footer.logo.asset.url}
                  alt={footer.logo.alt || footer.companyName || 'Logo'}
                  className="h-8 w-auto [&>svg]:h-full [&>svg]:w-auto"
                />
              ) : (
                <span className="text-xl font-bold">{footer.companyName}</span>
              )}
            </Link>
            {footer.companyName && footer.logo?.asset && (
              <p className="text-sm">{footer.companyName}</p>
            )}
          </div>

          {/* Link Columns */}
          {footer.linkColumns && footer.linkColumns.length > 0 && (
            <div className="md:col-span-8 flex flex-wrap gap-8">
              {footer.linkColumns.map((column, columnIndex) => {
                if (!column?.title) return null

                return (
                  <div key={columnIndex}>
                    <h3 className="font-semibold text-sm uppercase tracking-wide mb-4">
                      {column.title}
                    </h3>
                    {column.links && column.links.length > 0 && (
                      <ul className="space-y-3">
                        {column.links.map((link, linkIndex) => {
                          if (!link?.slug || !link?.text) return null

                          // Handle home page specially
                          const href = link.slug === 'home' || link.slug === '/' ? '/' : `/${link.slug}`

                          return (
                            <li key={linkIndex}>
                              <Link
                                href={href}
                                className="text-sm transition-colors"
                              >
                                {link.text}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Bottom Section: Copyright and Info Links */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} {footer.companyName}. All rights reserved.
          </p>

          {footer.infoLinks && footer.infoLinks.length > 0 && (
            <ul className="flex flex-wrap gap-6">
              {footer.infoLinks.map((link, index) => {
                if (!link?.slug || !link?.text) return null

                // Handle home page specially
                const href = link.slug === 'home' || link.slug === '/' ? '/' : `/${link.slug}`

                return (
                  <li key={index}>
                    <Link
                      href={href}
                      className="text-sm transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </footer>
  )
}
