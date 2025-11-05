import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Event from './components/Event'
import EventDetails from './components/EventDetails'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Event/>
      <EventDetails/>
    </>
  )
}

export default App
