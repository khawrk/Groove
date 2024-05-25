import { useContext } from 'react';
import SongContext from '../../context/SongContext';
import NotFound from '../NotFound/NotFound';
import GrooveLogo from '../../assets/GrooveLogo.svg'
import { Link } from 'react-router-dom';
import './SongDisplay.css'
import { Container, Image, Row, Col } from 'react-bootstrap';

type Track = {
    id: string,
    songName: string,
    artist: string,
    uri: string,
    imageURL: string
}

const SongDisplay = () => {
    const { listTrack, setSongID, searchTerm, setListTrack } = useContext(SongContext);
    console.log(listTrack)

    const handleSelectSong = (key: string) => {
        setSongID(key)
    }

    const handleBackToSearch = () => {
        setListTrack([]);
    }

    return (
        <>
            {listTrack.length === 0 ? (
                <NotFound />
            ) : (
                <Container className='container SongDisplay'>
                    <Image src={GrooveLogo} className='groove'></Image>
                    <Container className='container header'>
                        <h2>Your Search</h2>
                        <h3>"{searchTerm}"</h3>
                    </Container>
                    <hr />
                    <Container className="result">
                        {listTrack.map((song: Track) => (
                            <Link to={`/song/${song.id}`} key={song.id} onClick={() => handleSelectSong(song.id)}>
                                <Row className='songList'>
                                    <Image src={song.imageURL} ></Image>
                                    <Col className='songInfo'>
                                        <h3>{song.songName}</h3>
                                        <p>Artist: {song.artist}</p>
                                    </Col>
                                </Row>
                            </Link>
                        ))}
                    </Container>
                    <Link to={'/search'} onClick={handleBackToSearch}><button className='btn btnDisplay'>Back to search</button></Link>
                    <footer>
                        <p>Powered by Spotify</p>
                    </footer>
                </Container>
            )}
        </>
    );
};

export default SongDisplay;