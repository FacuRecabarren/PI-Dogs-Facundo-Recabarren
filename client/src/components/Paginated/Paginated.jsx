import React from "react";
import style from "./paginated.module.css"

const Paginated = ({dogsPerPage, dogs, pagination}) => {

    const pages = [];

    for (let i=0; i <= Math.floor(dogs/dogsPerPage); i++){
        pages.push(i+1)
    } // The number of pages is determined by dividing the total number of dogs by the number of dogs per page, rounding down with the Math.floor() function.

  return (
    <nav>
        <ul className={style.pagination}>
            {
            pages && pages.map(num => (
                <li className={style.pageNumber} key={num}>

                        <a className={style.link} onClick={() => pagination(num)}>{num}</a>    
                    
                </li>
            ))}
        </ul>
    </nav>
  );
}

export default Paginated;