import { Album } from './album'
import { Artist } from './artist'

export interface Track {
  id: string
  name: string
  previewUrl: string
  album: Album
  artists: Artist[] | Artist
  explicit: boolean
}
