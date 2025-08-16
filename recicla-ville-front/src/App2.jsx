

import { Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import Dashboard from './Pages/Dashboard/Dashboard'
import Places from './Pages/Places/Places'
import PlaceRegister from './Pages/PlaceRegister/PlaceRegister'


import './App.css'


function App2() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/places" element={<Places />} />
        <Route path="/placeRegister" element={<PlaceRegister />} />
      </Routes>
    </>
  )
}

export default App2
