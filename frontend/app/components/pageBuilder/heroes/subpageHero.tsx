import PortableText from '@/app/components/ui/PortableText'

interface SubpageHeroProps {
  _type?: string
  _key?: string
  heading?: string
  content?: any
  block?: {
    heading?: string
    content?: any
  }
}
export default function SubpageHero(props: SubpageHeroProps) {
  const {heading, content} = props.block || props
  return (
    <section className="py-8 md:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 tracking-tight">{heading}</h1>
        <PortableText value={content} />
      </div>
    </section>
  )
}
