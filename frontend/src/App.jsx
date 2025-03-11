import React, {useState} from 'react'
import LandingPage from './components/LandingPage'
import PlayersPage from './components/PlayersPage'
import Navbar from './components/Navbar'
import SquadPage from './components/SquadPage'
import './App.css'

function App() {

  const [page,setPage] = useState('landing');

  return (
    <div className="App min-h-screen w-full">
      <Navbar page={page} setPage={setPage} />
      {page === "landing" && <LandingPage />}
      {page === "players" && <PlayersPage />}
      {page === "squad" && <SquadPage />}
    </div>
  )
}

export default App