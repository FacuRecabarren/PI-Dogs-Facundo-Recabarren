import React from "react";
import style from "./paginated.module.css";

const Paginated = ({ dogsPerPage, dogs, currentPage, pagination }) => {
  const totalPages = Math.ceil(dogs / dogsPerPage);
  const pages = [];

  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }


  return (
    <div>
      <ul className={style.pagination}>
        {pages.map((num) => (
          <li className={style.pageNumber} key={num}>
            <a
              className={style.link}
              onClick={() => pagination(num)}
            >
              {num}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paginated;