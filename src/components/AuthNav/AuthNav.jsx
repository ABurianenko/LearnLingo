import { NavLink } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import s from "./AuthNav.module.css"

export const AuthNav = () => {
    return (
        <div className={s.auth_nav}>
            <NavLink className={s.auth_nav_login} to="/login">
                <FiLogIn className={s.auth_nav_login_icon} />
                Log in
            </NavLink>
            <NavLink className={s.auth_nav_register} to="/register">
                Registration
            </NavLink>
        </div>
    )
}