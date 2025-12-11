import Link from 'next/link'
import {navigationQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import ResponsiveImage from '../ui/ResponsiveImage'

type Navigation = {
  _id: string
  logo?: {
    asset?: any
    alt?: string
  }
  items?: Array<{
    text?: string
    slug?: string
  }>
}

export default async function Header() {
  const {data: navigation} = await sanityFetch<Navigation | null>({
    query: navigationQuery,
  })

  return (
    <header className="fixed z-50 h-(--nav-height) inset-0 bg-white/80 dark:bg-black/80 flex items-center backdrop-blur-lg">
      <div className="container py-2 px-2 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            {navigation?.logo?.asset ? (
              <ResponsiveImage
                image={navigation.logo}
                alt={navigation.logo.alt || 'Logo'}
                className="h-8 w-auto"
                sizes="(max-width: 768px) 120px, 150px"
                quality={90}
                loading="eager"
                fetchPriority="high"
              />
            ) : (
              <span className="text-sm pl-2 font-semibold">Logo</span>
            )}
          </Link>

          {navigation?.items && navigation.items.length > 0 && (
            <nav>
              <ul
                role="list"
                className="flex items-center gap-4 md:gap-6 leading-5 text-sm tracking-tight font-mono"
              >
                {navigation.items.map((item, index) => {
                  if (!item?.slug || !item?.text) return null

                  // Handle home page specially
                  const href = item.slug === 'home' || item.slug === '/' ? '/' : `/${item.slug}`

                  return (
                    <li key={index}>
                      <Link href={href} className="hover:underline">
                        {item.text}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}
