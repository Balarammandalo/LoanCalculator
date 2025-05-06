import React from 'react'
import './App.css'
import Home from './component/Home'
import {Routes , Route} from 'react-router-dom'
import ExchangeLive from './component/ExchangeLive'
import ErrorPage from './component/ErrorPage'
import NavbarIcon from './component/NavbarIcon'

const App = () => {
  return (
    <>
      
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exchange" element={<ExchangeLive />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
    </div>
    </>
  )
}

export default App
