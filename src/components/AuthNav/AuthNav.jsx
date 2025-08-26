import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import s from "./AuthNav.module.css"
import { useDispatch } from "react-redux";
import { openLoginModal, openRegisterModal } from "../../redux/modal/slice";

export const AuthNav = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const openLogin = () => {
        const params = new URLSearchParams(location.search);
        params.set('auth', 'login');

        navigate(
            {
                pathname: location.pathname,
                search: params.toString()
            },
            {
                state: {
                    from: location.pathname + location.search
                }
            }
        );
        dispatch(openLoginModal());
    }

    const openRegister = () => {
        const params = new URLSearchParams(location.search);
        params.set('auth', 'register');

        navigate(
            {
                pathname: location.pathname,
                search: params.toString()
            },
            {
                state: {
                    from: location.pathname + location.search
                }
            }
        );
        dispatch(openRegisterModal());
    }

    return (
        <div className={s.auth_nav}>
            <NavLink className={s.auth_nav_login} onClick={openLogin} to="/login">
                <FiLogIn className={s.auth_nav_login_icon} />
                Log in
            </NavLink>
            <NavLink className={s.auth_nav_register} onClick={openRegister} to="/register">
                Registration
            </NavLink>
        </div>
    )
}