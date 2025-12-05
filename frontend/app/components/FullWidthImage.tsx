import {urlForImage} from '@/sanity/lib/utils'

interface FullWidthImageProps {
  block: {
    _type: string
    _key: string
    image: any
    alt: string
  }
}

export default function FullWidthImage({block}: FullWidthImageProps) {
  // Use 4:5 aspect ratio (1920 x 2400) for hotspot-aware cropping
  const imageUrl = urlForImage(block.image, 1920, 2400)?.url()

  if (!imageUrl) return null

  return (
    <div className="w-full aspect-4/5">
      <img
        src={imageUrl}
        alt={block.alt || ''}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  )
}
