import Image from 'next/image'
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
      <div className="relative w-full h-full">
        <Image
          src={imageUrl}
          alt={block.alt || ''}
          fill
          className="object-cover w-full"
          sizes="100vw"
          priority={false}
        />
      </div>
    </div>
  )
}
