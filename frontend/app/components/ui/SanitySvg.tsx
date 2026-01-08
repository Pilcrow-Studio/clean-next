type SanitySvgProps = {
  url: string
  alt?: string
  className?: string
}

export default async function SanitySvg({ url, alt, className }: SanitySvgProps) {
  let svgContent: string | null = null

  // Check if it's an SVG file
  const isSvg = url.endsWith('.svg')

  if (isSvg) {
    try {
      const response = await fetch(url)
      if (response.ok) {
        svgContent = await response.text()
      }
    } catch (error) {
      console.error('Failed to fetch SVG:', error)
    }
  }

  // If we successfully fetched SVG content, render it inline
  if (svgContent) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: svgContent }}
        aria-label={alt}
      />
    )
  }

  // Fallback to img tag if not SVG or fetch failed
  return <img src={url} alt={alt || ''} className={className} />
}
