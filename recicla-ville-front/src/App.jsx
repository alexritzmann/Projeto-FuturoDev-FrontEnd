

import { Route, Routes, useLocation } from 'react-router-dom'

import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Header from './components/Header/Header'
import PlaceRegister from './Pages/PlaceRegister/PlaceRegister'
import Places from './Pages/Places/Places'
import Dashboard from './Pages/Dashboard/Dashboard'


import './App.css'


function App() {

  const location = useLocation();
  const hideHeaderPaths = ['/login', '/register', '/'];
  
  // Verifica se o header deve ser exibido
  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);


  return (
    <>
    {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/placeRegister" element={<PlaceRegister />} />
        <Route path="/places" element={<Places />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
