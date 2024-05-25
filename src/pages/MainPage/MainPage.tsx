import 'bootstrap/dist/css/bootstrap.min.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import axios, { HttpStatusCode } from 'axios';
import { Button, Container, Form } from 'react-bootstrap';
import './MainPage.css';
import GrooveLogo from '../../assets/GrooveLogo.svg';
import { useContext } from 'react'
import SongContext from '../../context/SongContext';
import { useNavigate } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';


type FormTypes = {
  nameMusic: string
}

function MainPage() {
  const [formData, setFormData] = useState<FormTypes>({
    nameMusic: ''
  })

  const navigate = useNavigate();

  const { setListTrack, setSearchTerm } = useContext(SongContext);
  const [token, setToken] = useState('');
  const [error, setError] = useState(false)
  let aux: string = ''

  useEffect(() => {
    // Function to fetch access token from your server
    async function fetchSpotifyToken() {
      const url = "https://accounts.spotify.com/api/token";
      const clientId = "23161846386e4a8599aa0d29979cb7a4"; // Replace with your actual client ID
      const clientSecret = "1ea4db5b0bb944e99937721f4dd37db5"; // Replace with your actual client secret
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const body = new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      });
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: headers,
          body: body,
        });
        const data = await response.json();
        setToken(data.access_token);
      } catch (error) {
        console.error("Error fetching Spotify token:", error);
      }
    }
    // Call the function to perform the operation
    fetchSpotifyToken();
  }, [])


  const fetchDataFromSpotify = async () => {
    try {
      // q=remaster%20track:${formData.nameMusic}&type=track
      const response = await axios.get('https://api.spotify.com/v1/search?' + aux, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (HttpStatusCode.Accepted) {
        const newTracks = response.data.tracks.items.map((track: any) => ({
          id: track.id,
          songName: track.name,
          artist: track.artists[0].name,
          uri: track.uri,
          imageURL: track.album.images[2].url
        }));

        setListTrack(newTracks);
      }
    } catch (error) {
      setError(true)
      console.error('Error fetching data from Spotify API:', error);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const inputName = event.target.name
    const inputValue = event.target.value

    setFormData(currentFormData => ({
      ...currentFormData,
      [inputName]: inputValue
    }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    aux = `type=track&q=${formData.nameMusic}`
    fetchDataFromSpotify()
    const searchTerm = encodeURIComponent(formData.nameMusic); // Encode search term
    setSearchTerm(formData.nameMusic)
    setTimeout(() => {
      navigate(`/search/${searchTerm}`);
    }, 1000)
  }

  return (
    <>{!error ? <div className='container MainPage text-center'>
      <img src={GrooveLogo}></img>
      <h2>Howdy 👋</h2>
      <h4>What song would you like to listen to today?</h4>
      <Container fluid >
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="You belong with me"
            className="me-2"
            aria-label="Search"
            name="nameMusic"
            value={formData.nameMusic}
            onChange={handleInputChange}
          />
        </Form>
        <Button onClick={handleSubmit} variant="outline-success">Search</Button>
      </Container>
      <footer>
        <p>Powered by Spotify</p>
      </footer>
    </div> : <NotFound></NotFound>}
    </>
  )
}

export default MainPage