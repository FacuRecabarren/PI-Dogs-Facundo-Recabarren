import React from "react";
import { Link } from "react-router-dom";
import styles from '../DogCard/dogCard.module.css'

const DogCard = ({ id, image, name, temperament, weightMin, weightMax, averageWeight }) => {
    return (
        <div className={styles.dogCard}>
            <Link to={`/detail/${id}`}>
                <img src={image} alt={name} height='200px' />
            </Link>
            <h3>{name}</h3>
            <h4>{temperament}</h4>
            <h4>Min weight: {weightMin} - Max weight: {weightMax}</h4>
            <h4>Average weight: {averageWeight}</h4>
        </div>
    )
}

export default DogCard;