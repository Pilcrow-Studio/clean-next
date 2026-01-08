
import type {Metadata} from 'next'
import Head from 'next/head'
import PageBuilder from '@/app/components/pageBuilder/PageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {getPageQuery, pagesSlugs} from '@/sanity/lib/queries'
import {generateMetadataFromSeo} from '@/sanity/lib/utils'
import NotFound from '../components/global/404'


// Use on-demand revalidation via webhook instead of time-based
export const revalidate = false

type Props = {
  params: Promise<{slug: string}>
}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: pagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  })
  return data
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  })
  return generateMetadataFromSeo(
    page?.seo,
    page?.name,
    page?.heading || page?.name || 'Explore our content'
  )
}

export default async function Page(props: Props) {
  const params = await props.params
  const [{data: page}] = await Promise.all([sanityFetch({query: getPageQuery, params})])

  if (!page?._id) {
    return (
      <div className="py-40">
        <NotFound />
      </div>
    )
  }

  return (
    <div>
      <PageBuilder sections={page.pageBuilder ?? undefined} pageId={page._id} pageType="page" />
    </div>
  )
}
