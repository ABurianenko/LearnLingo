import { NavLink } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import s from "./AuthNav.module.css"
import { useDispatch } from "react-redux";
import { openLoginModal, openRegisterModal } from "../../redux/modal/slice";

export const AuthNav = () => {
    const dispatch = useDispatch();

    return (
        <div className={s.auth_nav}>
            <NavLink className={s.auth_nav_login} onClick={()=>dispatch(openLoginModal())} to="/login">
                <FiLogIn className={s.auth_nav_login_icon} />
                Log in
            </NavLink>
            <NavLink className={s.auth_nav_register} onClick={()=>dispatch(openRegisterModal())} to="/register">
                Registration
            </NavLink>
        </div>
    )
}