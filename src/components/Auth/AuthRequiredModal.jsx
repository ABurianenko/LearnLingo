import { useCallback } from "react";
import { closeModal } from "../../redux/modal/slice";
import { ModalWrap } from "../../ui/ModalWrap/ModalWrap"
import { useDispatch, useSelector } from "react-redux";
import { selectAuthRequiredModal } from "../../redux/modal/selectors";
import { Link, NavLink, useLocation } from "react-router-dom";
import s from './AuthModal.module.css';

export const AuthRequiredModal = () => {
    const mode = useSelector(selectAuthRequiredModal);
    const isOpen = !!mode; 
    const dispatch = useDispatch();
    const location = useLocation();
    const currentUrl = location.pathname + location.search;

    const baseClose = useCallback(() => {
        dispatch(closeModal());
    }, [dispatch]);

    if (!isOpen) return null;   

    return (
        <ModalWrap
            className={s.auth_required_modal}
            isOpen={isOpen}
            onBaseClose={baseClose}
            title="Sign in required"
        >
            <p>Adding to Favorites is available only for signed-in users. Please 
                <NavLink
                    className={s.auth_link}
                    to='/login'
                    state={{ from: currentUrl }}
                    replace={false}
                    onClick={() => dispatch(closeModal())}
                >
                    log in
                </NavLink> or
                <NavLink
                    className={s.auth_link}
                    to='/register'
                    state={{ from: currentUrl }}
                    replace={false}
                    onClick={() => dispatch(closeModal())}
                >
                    create an account
                </NavLink> to continue.</p>
        </ModalWrap>
    )
}