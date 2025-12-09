import ResponsiveImage from './ResponsiveImage'

interface FullWidthImageProps {
  block: {
    _type: string
    _key: string
    image: any
    alt: string
  }
}

export default function FullWidthImage({block}: FullWidthImageProps) {
  if (!block.image?.asset) return null

  return (
    <div className="w-full aspect-video">
      <ResponsiveImage
        image={block.image}
        alt={block.alt}
        className="w-full h-full object-cover"
        sizes="100vw"
        quality={80}
        usePixelDensity={true}
        loading="eager"
        fetchPriority="high"
        baseWidth={720}
        aspectRatio={16/9}
        fit="crop"
      />
    </div>
  )
}

