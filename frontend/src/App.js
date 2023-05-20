import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';

const App = () => {
  const [user, setLoginUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : {};
    } catch (error) {
      console.error('Error parsing stored user data:', error);
      return {};
    }
  });

  // console.log(user); 

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    // console.log(user); 
  }, [user]);



  return (
    <Router>
        <Navbar user={user} setLoginUser={setLoginUser}  />
        <Routes>
          <Route path="/"  element={user && user.id ? (<Dashboard user={user} setLoginUser={setLoginUser} />) : (<Login setLoginUser={setLoginUser} />)} />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-inventory"  />
        </Routes>
      </Router>
  )
}

export default App