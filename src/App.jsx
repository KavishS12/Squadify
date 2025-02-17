import React, {useState} from 'react'
import LandingPage from './components/LandingPage'
import PlayersPage from './components/PlayersPage'
import Navbar from './components/Navbar'
import './App.css'

function App() {

  const [page,setPage] = useState('landing');

  return (
    <div className="App min-h-screen w-full">
      <Navbar page={page} setPage={setPage} />
      {page === "landing" && <LandingPage />}
      {page === "players" && <PlayersPage />}
    </div>
  )
}

export default App