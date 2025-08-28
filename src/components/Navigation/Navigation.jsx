import { NavLink } from "react-router-dom";

import s from "./Navigation.module.css"
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export const Navigation = () => {
    const loggedIn = useSelector(selectIsLoggedIn);

    return (
        <nav className={s.navigation}>
            <NavLink className={s.navigation_link} to="/">
                Home
            </NavLink>
            <NavLink className={s.navigation_link} to="/teachers">
                Teachers
            </NavLink>
            {loggedIn ?
                <NavLink className={s.navigation_link} to="/favourites">
                    Favourites
                </NavLink> : null
            }
        </nav>
    )
}