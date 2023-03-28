import './App.css';
import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import LandingPage from '../src/components/LandingPage/LandingPage'
import Home from './components/Home/Home';
import DogCreate from './components/DogCreate/DogCreate';
import Detail from './components/DogDetail/DogDetail';
import Error404 from './components/Error404/Error404';

function App() {
  return (
    <div className="App">
      <Routes> 
        <Route path = '/' element = {<LandingPage/>} />
        <Route path = '/home' element = {<Home/>} />
        <Route path = '/dog' element = {<DogCreate/>} />
        <Route path = '/detail/:id' element={<Detail/>}/>
        <Route path = '*' element= {<Error404/>}/>
      </Routes>
    </div>
  );
}

export default App;
