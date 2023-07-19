
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css';

import Home from './components/Home';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

import AuthContext from './store/authContext';
import { useContext } from 'react';
import Profile from './components/Profile';

const App = () => {
  const authCtx = useContext(AuthContext)

  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={!authCtx.token ? <Auth/> : <Navigate to='/Auth'/>}/>
          <Route path='/Dashboard' element={authCtx.token ? <Dashboard/> : <Navigate to='/auth'/>}/>
          <Route path='/Profile' element={authCtx.token ? <Profile/> : <Navigate to='/auth'/> } />
          <Route path='*' element={<Navigate to='/'/>} />
        </Routes>
    </div>
  )
}

export default App;