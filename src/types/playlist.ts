import { Image } from './image'

export interface Playlist {
  id: string
  description: string
  name: string
  images: Image[]
  externalUrls?: Record<string, any>
  isPublic?: boolean;
  collaborative?: boolean;
}
