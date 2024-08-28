import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import OptionsPanel from './OptionsPanel'
import SpaceCanvas from './SpaceCanvas'
import './App.css'

function App() {

  return (
    <div className="app">
          <SpaceCanvas></SpaceCanvas>
          <OptionsPanel></OptionsPanel>
    </div>
  )
}

export default App
