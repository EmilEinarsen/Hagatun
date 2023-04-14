import { SanityImage } from "sanity-image"
import { SanityImageProps } from "sanity-image/dist/types"
import { projectDetails } from "sanity/projectDetails"
import { ImageSrc } from "~/loaders/groq-fragments/objects/image"
import { clsx } from "~/utils/utils"

const details = projectDetails()

export const getImageProps = (image: ImageSrc) => ({
  id: image.id, 
  baseUrl: `https://cdn.sanity.io/images/${details.projectId}/${details.dataset}/`,
  mode: 'cover',
  hotspot: image.hotspot,
  crop: image.crop,
  preview: image.lqip,
}) as const

type ImageProps = Omit<
  SanityImageProps & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  "baseUrl" | "dataset" | "projectId" | 'preview' | 'crop' | 'hotspot' | 'id'
> & {
  image: ImageSrc
  background?: boolean
}

export const Image = (
  { image, background, ...props }: ImageProps
) => (
  <SanityImage
    alt={image.alt}
    {...getImageProps(image)}
    loading='lazy'
    {...props}
    className={clsx(
      background ? 'absolute top-0 left-0 w-full h-full select-none z-0' : 'block max-w-full w-full h-auto',
      background && image.type !== 'image/svg+xml' && 'object-cover',
      props.className,
    )}
  />
)
