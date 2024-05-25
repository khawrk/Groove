import { useContext } from 'react'
import SongContext from '../../context/SongContext'
import { Link } from 'react-router-dom'
import GrooveLogo from '../../assets/GrooveLogo.svg'
import './SongPlayer.css'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'

const SongPlayer = () => {
    const { listTrack, songID, searchTerm, setListTrack } = useContext(SongContext)
    console.log(songID)
    console.log(listTrack)

    const handleBackToSearch = () => {
        setListTrack([]);
    }

    const selectedSongData = listTrack.filter(song => (song.id === songID))
    const selectedSongURI = selectedSongData[0].uri.split(':')[2]
    return (
        <>
            <Container className='Player'>
                <Row><Image src={GrooveLogo} className='groove'></Image></Row>
                <h2>{selectedSongData[0].songName}</h2>
                <h3>{selectedSongData[0].artist}</h3>
                <Row key={selectedSongData[0].id}>
                    <iframe allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture; encrypted-media" src={`https://open.spotify.com/embed/track/${selectedSongURI}?utm_source=oembed`} frameBorder='0' className='SpotifyIframe'></iframe>
                </Row>
                <Row className="Btn">
                    <Col className='Btn'>
                        <Link to={`/search/${searchTerm}`}>
                            <Button className='btn playerBtn'>Back to result</Button>
                        </Link>
                    </Col>
                    <Col className='Btn'>
                        <Link to={'/search'}>
                            <Button className='btn playerBtn' onClick={handleBackToSearch}>Back to search</Button>
                        </Link>
                    </Col>
                </Row>
                <footer>
                    <p>Powered by Spotify</p>
                </footer>
            </Container>
        </>
    )
}

export default SongPlayer
