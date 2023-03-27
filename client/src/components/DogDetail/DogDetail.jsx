import React from 'react';
import { getDogDetail } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import style from "../DogDetail/dogDetail.module.css";

const Detail = () => {
  let dispatch= useDispatch();
  let { id }= useParams();
  const dogDetail= useSelector((state) => state.dogDetail);

  useEffect(() => {
    dispatch(getDogDetail(id))
  }, [])

  return (

    <div className={style.parent}>
      
      <div className={style.div1}>

        <div className={style.div2}>
          <img className={style.img} src={dogDetail?.image ? dogDetail.image : "img"} alt="img" />
          <div className={style.divTitles}>
            <span className={style.title}>{dogDetail?.name}</span>
            <span className={style.subtitle}>{dogDetail?.temperament}</span>
          </div>
          
        </div>

        <div className={style.div3}>
            <h3 className={style.spanTitle}>Dog number: <span className={style.spanSubtitle}>{dogDetail?.id}</span></h3>
            <hr />
            <h3 className={style.spanTitle}>Weight: <span className={style.spanSubtitle}> {dogDetail?.weightMin} - </span><span className={style.spanSubtitle}>{dogDetail?.weightMax}</span></h3>
            <hr />
            <h3 className={style.spanTitle}>Average weight: <span className={style.spanSubtitle}>{dogDetail?.averageWeight}</span></h3> 
            <hr />
            <h3 className={style.spanTitle}>Height: <span className={style.spanSubtitle}>{dogDetail?.height}</span></h3>
            <hr />
            <h3 className={style.spanTitle}>Life expectancy: <span className={style.spanSubtitle}>{dogDetail?.life_span}</span></h3>
            <hr /> 
            <Link to="/home">
              <button className={style.btnDetail}>Back Home</button>
            </Link>
        </div>
     
      </div>
   

    </div>

  )
}

export default Detail;