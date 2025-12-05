import createImageUrlBuilder from '@sanity/image-url'
import {Link} from '@/sanity.types'
import {dataset, projectId, studioUrl} from '@/sanity/lib/api'
import {createDataAttribute, CreateDataAttributeProps} from 'next-sanity'
import {getImageDimensions} from '@sanity/asset-utils'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: any, width?: number, height?: number) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined
  }

  const imageRef = source?.asset?._ref
  const crop = source.crop
  const hotspot = source.hotspot

  // get the image's og dimensions
  const {width: imgWidth, height: imgHeight} = getImageDimensions(imageRef)

  let builder = imageBuilder?.image(source)

  if (Boolean(crop)) {
    // compute the cropped image's area
    const croppedWidth = Math.floor(imgWidth * (1 - (crop.right + crop.left)))
    const croppedHeight = Math.floor(imgHeight * (1 - (crop.top + crop.bottom)))

    // compute the cropped image's position
    const left = Math.floor(imgWidth * crop.left)
    const top = Math.floor(imgHeight * crop.top)

    builder = builder.rect(left, top, croppedWidth, croppedHeight)
  }

  // Apply hotspot if it exists
  if (Boolean(hotspot)) {
    builder = builder.fit('crop').crop('focalpoint').focalPoint(hotspot.x, hotspot.y)
  }

  // Apply dimensions if provided
  if (width) {
    builder = builder.width(width)
  }
  if (height) {
    builder = builder.height(height)
  }

  return builder.auto('format')
}

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) return
  const url = urlForImage(image, width, height)?.url()
  if (!url) return
  return {url, alt: image?.alt as string, width, height}
}

// Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.
export function linkResolver(link: Link | undefined) {
  if (!link) return null

  // If linkType is not set but href is, lets set linkType to "href".  This comes into play when pasting links into the portable text editor because a link type is not assumed.
  if (!link.linkType && link.href) {
    link.linkType = 'href'
  }

  switch (link.linkType) {
    case 'href':
      return link.href || null
    case 'page':
      if (link?.page && typeof link.page === 'string') {
        return `/${link.page}`
      }
    case 'post':
      if (link?.post && typeof link.post === 'string') {
        return `/posts/${link.post}`
      }
    default:
      return null
  }
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config)
}
