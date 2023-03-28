import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import {setCurrentPage, filterByOrigin, getAllBreeds, orderByName, orderByWeight, filterByTemper, getAllTemperaments} from "../../../redux/actions"
import Dog from "../../DogCard/DogCard"
import Pagination from '../../Paginated/Paginated';
import style from "../FilterDogs/filterDogs.module.css";


// Filter dogs functions 

const FilterDogs = () => {

  // Consts

  const dispatch= useDispatch();
  const dogs= useSelector(state => state.dogs);
  const [order, setOrder]= useState('')
  const [temperament, setTemperament]= useState('all')

  const currentPage = useSelector(state => state.currentPage);
  const [dogsPerPage, setDogsPerPage] = useState(8) // Eight dogs per page
  const numOfLastDog= currentPage * dogsPerPage;
  const numOfFirstDog= numOfLastDog - dogsPerPage;
  const currentDogs = dogs.slice(numOfFirstDog, numOfLastDog)

  // Functions
  
  const pagination= (page) => {
    dispatch(setCurrentPage(page))
  }

  const temperaments = useSelector((state) => state.temperaments).sort(
    function (a, b) {
        if (a < b) return -1;
        else return 1;
    })

  const handleOrder1= (event) => {
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }

  const handleOrder2 = (event) =>{
    dispatch(orderByWeight(event.target.value))
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }

  const handleFilterByOrigin= (event) => {
    dispatch(filterByOrigin(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }

  const handleFilterByTemper= (event) => {
    setTemperament(event.target.value)
    dispatch(filterByTemper(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }

  useEffect(()=> {
    dispatch(getAllBreeds())
    dispatch(getAllTemperaments())
  }, [dispatch]);

  // Render

  return (
    
    <div className={style.bodyFilterDogs}>
      <div className={style.filters}>
        <div className={style.filterTitle}>Filter dogs' sourcing</div>
        <select className={style.filterSelect} onChange={event => {handleFilterByOrigin(event)}}>
          <option value="All">All dogs</option>
          <option value="api">Api dogs</option>
          <option value="from_DB">My dogs</option>
        </select>

        <div className={style.filterTitle}>Filter dogs by temperament</div>
        <select className={style.filterSelect} defaultValue="temp" value={temperament} onChange={event => {handleFilterByTemper(event)}}>
          <option value="all">All Temperaments</option>
              {temperaments.map((temp) => {
                return (
                  <option value={temp} key={temp}>
                    {temp}
                  </option>
                );
              })}
        </select> 

        <div className={style.filterTitle}>Alphabetical Ordering</div>
        <select className={style.filterSelect} defaultValue="name" onChange={event =>{handleOrder1(event)}}>
          <option value="name" disabled selected>Select</option>
          <option value="a-z">A - Z</option>
          <option value="z-a">Z - A</option>
        </select>

        <div className={style.filterTitle}>Weight Ordering</div>
        <select className={style.filterSelect} defaultValue="weight" onChange={event =>{handleOrder2(event)}}>
          <option value="weight" disabled selected>Select</option>
          <option value="minWeight">From lighter to heavier</option>
          <option value="maxWeight">From heavier to lighter</option>
        </select>

        <div className={style.filterTitle}>Average weight</div>
        <select className={style.filterSelect} defaultValue="aver" onChange={event =>{handleOrder2(event)}}>
          <option value="aver" disabled selected>Select</option>
          <option value="average">Order from lighter to heavier</option>
          <option value="average-max">Order from heavier to lighter</option>
        </select>
      </div> 
      
      <Pagination
          dogsPerPage= {dogsPerPage}
          dogs= {dogs.length}
          pagination= {pagination} />
      
      <div className={style.container}>
      
      {
        currentDogs?.map(dog=> {
          return (
          <Dog
          id= {dog.id}
          key= {dog.id}
          image= {dog.image}
          name= {dog.name}
          temperament= {dog.temperament}
          weightMin= {dog.weightMin}
          weightMax= {dog.weightMax}
          averageWeight= {dog.averageWeight}
          />
          )
        })
      }
        
      </div>    
      
    </div>
  )
}

export default FilterDogs;