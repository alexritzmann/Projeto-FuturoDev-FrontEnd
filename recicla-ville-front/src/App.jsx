

import { Route, Routes } from 'react-router-dom'

import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'

import './App.css'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
