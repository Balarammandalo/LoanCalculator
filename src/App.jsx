import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'
import Home from './component/Home'
import {Routes , Route} from 'react-router-dom'
import ExchangeLive from './component/ExchangeLive'
import ErrorPage from './component/ErrorPage'

const App = () => {
  return (
    <ThemeProvider>
      
    <div>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/exchange" element={<ExchangeLive />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
    </div>
    </ThemeProvider>
  )
}

export default App
