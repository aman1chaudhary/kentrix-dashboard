import React from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard'
// import Footer from './components/Footer';
// import MapDashboard from './Pages/MapDashboard';

const App = () => {
  return (
    <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/" element={<MapDashboard />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
  

        </Routes>
        {/* <Footer/> */}

      </Router>
  )
}

export default App