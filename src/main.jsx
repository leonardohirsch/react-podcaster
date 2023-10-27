import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './store/'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/home/Home";
import Podcast from "./routes/podcast/Podcast";
import Episode from "./routes/episode/Episode";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = { store }>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/podcast/:podcastId" element={ <Podcast/> } />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={ <Episode/> } />
          <Route path='*' element={<Home />}/>
        </Routes>
      </ BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
