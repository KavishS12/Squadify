import React from 'react'
import LandingPage from './components/LandingPage'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <div className="App min-h-screen w-full">
      <Navbar />
      <LandingPage />
    </div>
  )
}

export default App