import './App.css'
import { useState, useEffect } from 'react'
import Loader from './pages/Loader/Loader'
import MainPage from './pages/MainPage/MainPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SongDisplay from './pages/SongDisplay/SongDisplay'
import SongPlayer from './pages/SongPlayer/SongPlayer'
import NotFound from './pages/NotFound/NotFound'


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={
            isLoading ? (
              <Loader />
            ) : (
              <div className="container">
                <MainPage></MainPage>
              </div>
            )} />
          <Route path="search">
            <Route index element={<MainPage></MainPage>}></Route>
            <Route path=":searchTerm" element={<SongDisplay />} />
          </Route>
          <Route path='song'>
            <Route path=":songID" element={<SongPlayer></SongPlayer>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router >
  )
}

export default App