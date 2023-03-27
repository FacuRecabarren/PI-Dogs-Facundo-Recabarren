import React from "react";
import style from "./paginated.module.css"

const Paginated = ({dogsPerPage, dogs, pagination}) => {

    const pages = [];

    for (let i=0; i <= Math.floor(dogs/dogsPerPage); i++){
        pages.push(i+1)
    }

  return (
    <nav>
        <ul className={style.pagination}>
            {
            pages && pages.map(num => (
                <li className={style.pageNumber} key={num}>

                    <button className={style.divLink}>
                        <a className={style.link} onClick={() => pagination(num)}>{num}</a>
                    </button>

                </li>
            ))}
        </ul>
    </nav>
  );
}

export default Paginated;