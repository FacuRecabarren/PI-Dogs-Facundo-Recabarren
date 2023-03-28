import React from "react";
import { Link } from "react-router-dom";
import style from '../Error404/error.module.css'

const Error404 = () => {

    return (
        <div className={style.bodyError}>
            <div className={style.divTitles}>
                <h2>AWWW, DON'T CRY</h2>
                <h3>It's just a 404 error!</h3>
                <div className={style.divTitle}>
                    <h1>Follow me, let's go home</h1>
                    <Link to='/home'>                    
                        <button className={style.btnError}>HOME</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Error404;