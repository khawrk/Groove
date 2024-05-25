
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React from 'react'
import SongContextProvider from './context/SongContextProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SongContextProvider>
    <App />
  </SongContextProvider>,
)
