import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../redux/actions"
import style from "./searchBar.module.css"

const SearchBar= ()=> {
const [dog, setDog]= useState("");
const dispatch= useDispatch();

const handleChange= (event)=> {
    event.preventDefault();
    setDog(event.target.value)
}

const handleSearch= (event) =>{
    event.preventDefault();
      dispatch(getDogsByName(dog));
      setDog("");
    }

   return (
      <div className={style.SearchContainer}>
         <input className={style.inputSearch} type='search' value={dog} onChange={handleChange} placeholder='Search dog...'/>
        <button className={style.btnSearch} type="submit" onClick={(event)=> handleSearch (event)}>Search</button>
      </div>
   );
}

export default SearchBar;