import React from 'react'
import AllDogs from './FilterDogs/FilterDogs';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from "react-router-dom";
import { getAllBreeds } from "../../redux/actions"
import { useState } from "react";
import { useDispatch } from 'react-redux';
import style from "./home.module.css"

const Home = () => {
  
  const [dog, setDog]= useState("");
  const dispatch= useDispatch();  

  const handleClick= (event)=> {
  event.preventDefault();
  dispatch(getAllBreeds());
  setDog("");
}    
  
  return (
    <div className={style.bodyHome}>
      <div className={style.divNav}>
        
        <Link to='/dog'>
          <button className={style.btnCreate}>Create Dog!</button>
        </Link>
        
        <button className={style.btnCreate} onClick={(event)=> handleClick(event)}>Get all dogs back</button>
        <SearchBar />
      </div>
      
      
      <AllDogs/>
    </div>
  )
}

export default Home;