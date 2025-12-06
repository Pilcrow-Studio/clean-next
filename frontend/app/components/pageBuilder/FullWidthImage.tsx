import ResponsiveImage from '../ResponsiveImage'

interface FullWidthImageProps {
  image?: {
    asset?: any
    alt?: string
    _type?: string
  }
}

export default function FullWidthImage({image}: FullWidthImageProps) {
  if (!image?.asset) return null

  return (
    <section className="w-full">
      <div className="relative w-full aspect-video">
        <ResponsiveImage
          image={image}
          className="w-full h-full object-cover"
          sizes="100vw"
          aspectRatio={16/9}
          fit="crop"
        />
      </div>
    </section>
  )
}
