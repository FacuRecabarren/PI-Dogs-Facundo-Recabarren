import React from "react";
import { Link } from "react-router-dom";
import style from '../DogCard/dogCard.module.css'

const DogCard = ({ id, image, name, temperament, weightMin, weightMax, averageWeight }) => {
    return (
        
        
        <div className={style.dogCard}>
            
            <div className={style.imgDiv}>
            <Link to={`/detail/${id}`}>
                <img className={style.imgCard} src={image} alt={name} />
            </Link>
            </div>
            <div className={style.divTitles}>
                <span className={style.titleDog}>{name}</span>
                <span className={style.subTitleDog}>{temperament}</span>
            </div>

            <div className={style.divData}>
             
                <h4 className={style.titleData}>Min weight<span className={style.subTitleData}>{weightMin}kg</span></h4>
                <h4 className={style.titleData}>Max weight<span className={style.subTitleData}>{weightMax}kg</span></h4>
                <h4 className={style.titleData}>Average weight<span className={style.subTitleDataAv}>{averageWeight}kg</span></h4>
              
            </div>
            <Link to={`/detail/${id}`}>
                <button className={style.btnCard}>Detail</button>
            </Link>
            
        </div>
        
    )
}

export default DogCard;