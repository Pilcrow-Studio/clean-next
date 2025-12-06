import PageBuilder from '@/app/components/pageBuilder/PageBuilder'
import {homeQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'

export default async function Page() {
  const {data: home} = await sanityFetch({
    query: homeQuery,
  })

  if (!home) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome</h1>
        <p className="text-gray-600">Please configure your home page in Sanity Studio.</p>
        <p className="text-sm text-gray-500 mt-4">
          Make sure you've published the home document in Sanity Studio.
        </p>
      </div>
    )
  }

  return (
    <PageBuilder
      sections={home.pageBuilder}
      pageId={home._id}
      pageType="home"
    />
  )
}
