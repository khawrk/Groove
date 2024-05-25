
import { createContext } from 'react'

type Track = {
  id: string,
  songName: string,
  artist: string,
  uri: string,
  imageURL: string
}

type SongContextType = {
  listTrack: Track[],
  setListTrack: (listTrack: Track[]) => void
  songID: string,
  setSongID: (songID: string) => void,
  searchTerm: string,
  setSearchTerm: (searchTerm: string) => void
}

const SongContext = createContext<SongContextType>({
  listTrack: [{
    id: '',
    songName: '',
    artist: '',
    uri: '',
    imageURL: ''
  }],
  setListTrack: () => [{}],
  songID: '',
  setSongID: () => { },
  searchTerm: '',
  setSearchTerm: () => { }
})

export default SongContext

