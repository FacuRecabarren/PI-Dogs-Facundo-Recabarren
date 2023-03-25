import React from "react";
import { Link } from "react-router-dom";
import style from '../LandingPage/landingPage.module.css'

const LandingPage = () => {
    return (
        <div className={style.bodyLanding}>
            <div className={style.divLanding}>
                <h1 className={style.titleLanding}>Welcome to our <span className={style.spanLanding}>dog creation platform!</span></h1>
                <Link to='/home'>
                    <button className={style.btnLanding}>ENTER</button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage;