import { Image } from './image'

export interface Playlist {
  id: string | undefined
  description: string | undefined
  name: string | undefined
  image: Image | undefined
  url: string | undefined
  isPublic?: boolean;
  isCollaborative?: boolean;
}
