
import { ReactNode, useState } from 'react';
import SongContext from './SongContext';

type SongContextProviderProps = {
  children: ReactNode
}

type Track = {
  id: string,
  songName: string,
  artist: string,
  uri: string,
  imageURL: string
}


// Provider component
const SongContextProvider = ({ children }: SongContextProviderProps) => {

  const [listTrack, setListTrack] = useState<Track[]>([])
  const [songID, setSongID] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState<string>('')

  return (
    <SongContext.Provider value={{ listTrack, setListTrack, songID, setSongID, searchTerm, setSearchTerm }}>
      {children}
    </SongContext.Provider >
  )
}


export default SongContextProvider

