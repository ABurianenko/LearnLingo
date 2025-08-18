import { NavLink } from "react-router-dom";

import s from "./Home.module.css"

export const Home = () => {
    return (
        <main className={s.home}>
            <div className={s.hero_container}>
                <h1 className={s.hero_title}>
                    Unlock your potential with the best <span>language</span> tutors
                </h1>
                <p className={s.hero_text}>
                    Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.
                </p>
                <NavLink className={s.hero_link} to="/teachers">
                    Get started
                </NavLink>
            </div>
            <div className={s.image_container}>
                <img className={s.image_img} src="/public/img/Student.png" alt="Happy student" />
                <div className={s.image_laptop}>
                    <svg>
                        <use href=""></use>
                    </svg>
                </div>
            </div>
            <div>
                <ul>
                    <li><span>32,000 + </span>Experienced tutors</li>
                    <li><span>300,000 + </span>5-star tutor reviews</li>
                    <li><span>120 + </span>Subjects taught</li>
                    <li><span>200 + </span>Tutor nationalities</li>
                </ul>
            </div>
        </main>
    )
}