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
    <div>
      <h1 className={style.title}>Dogs...Who can´t love them!</h1>
      <Link to='/dog'>Create dog</Link>
      <SearchBar />
      <button className={style.refButton} onClick={(event)=> handleClick(event)}>Get all dogs back</button>
      <AllDogs/>
    </div>
  )
}

export default Home;