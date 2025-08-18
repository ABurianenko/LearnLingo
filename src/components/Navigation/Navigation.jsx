import { NavLink } from "react-router-dom";

import s from "./Navigation.module.css"

export const Navigation = () => {
    return (
        <nav className={s.navigation}>
            <NavLink className={s.navigation_link} to="/">
                Home
            </NavLink>
            <NavLink className={s.navigation_link} to="/teachers">
                Teachers
            </NavLink>
        </nav>
    )
}