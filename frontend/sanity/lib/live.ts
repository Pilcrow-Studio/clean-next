import {draftMode} from 'next/headers'
import {client} from './client'

/**
 * Regular sanityFetch without live preview to reduce serverless function costs
 * Draft mode is still supported for content editors
 */

type SanityFetchParams = {
  query: string
  params?: Record<string, any>
  stega?: boolean
  perspective?: 'published' | 'previewDrafts'
}

export async function sanityFetch<T = any>({
  query,
  params = {},
  stega,
  perspective,
}: SanityFetchParams): Promise<{data: T}> {
  const {isEnabled: isDraftMode} = await draftMode()

  // Use draft perspective in draft mode, otherwise use the specified perspective or default to published
  const finalPerspective = isDraftMode ? 'previewDrafts' : (perspective || 'published')

  const data = await client.fetch<T>(query, params, {
    perspective: finalPerspective,
    useCdn: !isDraftMode, // Don't use CDN in draft mode to get fresh content
    stega: stega !== false && isDraftMode, // Enable stega only in draft mode unless explicitly disabled
    next: {
      revalidate: isDraftMode ? 0 : undefined, // No cache in draft mode
    },
  })

  return {data}
}

// Dummy component for backwards compatibility (no longer needed)
export function SanityLive() {
  return null
}
