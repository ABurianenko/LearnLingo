import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import s from "./AuthNav.module.css"
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal, openRegisterModal } from "../../redux/modal/slice";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { FaCircleUser } from "react-icons/fa6";
import { logoutUser } from "../../redux/auth/operations";
import { FiLogOut } from "react-icons/fi";

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

    const loggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUser);

    return (
        <div>
            {loggedIn ? (
                <div className={s.auth_nav}>
                    <div>
                        <FaCircleUser className={s.auth_nav_user_icon} />
                        <p>{user.displayName}</p>
                    </div>
                    <button className={s.auth_nav_logout} onClick={() => {dispatch(logoutUser())}}>
                        <FiLogOut className={s.auth_nav_logout_icon} />
                        Log out
                    </button>
                </div>
            ) : (
                <div className={s.auth_nav}>
                    <NavLink className={s.auth_nav_login} onClick={openLogin} to="/login">
                        <FiLogIn className={s.auth_nav_login_icon} />
                        Log in
                    </NavLink>
                    <NavLink className={s.auth_nav_register} onClick={openRegister} to="/register">
                        Registration
                    </NavLink>
                </div>    
            )}
            
        </div>
    )
}