import { useDispatch, useSelector } from "react-redux"
import { loginUser, registerUser } from "../../redux/auth/operations";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { selectAuthModal } from "../../redux/modal/selectors";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { closeModal } from "../../redux/modal/slice";
import { yupResolver } from '@hookform/resolvers/yup';

import s from './AuthModal.module.css';
import { useLocation, useNavigate } from "react-router-dom";

const validationRegisterSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .email('Must be a valid email')
        .required('Email is required'),
    password: Yup.string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required('Password is required'),
});

const validationLoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Must be a valid email')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
});

export function AuthModal() {
    const dispatch = useDispatch();

    const mode = useSelector(selectAuthModal);

    const dialogRef = useRef(null);
    const previouslyFocused = useRef(null);

    const schema = useMemo(() => (mode === 'register' ? validationRegisterSchema : validationLoginSchema), [mode]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ resolver: yupResolver(schema), mode: 'onTouched' });

    const location = useLocation();
    const navigate = useNavigate();
    const goBackRef = useRef(location.state?.from || "/");
    
    const onClose = useCallback(() => {
        reset();
        dispatch(closeModal());

        const params = new URLSearchParams(location.search);
        if (params.has('auth')) {
            params.delete('auth');
            navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
        } else {
            navigate(goBackRef.current, { replace: true });
        }
    }, [dispatch, reset, location.pathname, location.search, navigate]);

    useEffect(() => {
        if (!mode) return;
        
        previouslyFocused.current = document.activeElement;
        document.body.style.overflow = 'hidden';
        setTimeout(() => dialogRef.current?.querySelector('input').focus(), 0);

        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
            if (e.key === 'Tab') {
                const focusedEl = dialogRef.current.querySelectorAll(
                    'button, input'
                );
                const first = focusedEl[0];
                const last = focusedEl[focusedEl.length - 1];
                if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                } else if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            }
        };
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
            previouslyFocused.current.focus();
        };
    }, [mode, onClose])

    if (!mode) return null;

    const onBackdrop = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const onSubmit = async (data) => {
        try {
            if (mode === 'login') {
                await dispatch(loginUser({ email: data.email, password: data.password })).unwrap();
            } else {
                await dispatch(registerUser({ name: data.name, email: data.email, password: data.password })).unwrap();
            }
            onClose();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div
            className={s.backdrop}
            onClick={onBackdrop}
        >
            <div
                className={s.modal}
                ref={dialogRef}
                aria-modal="true"
            >
                <button onClick={onClose} >
                    <IoMdClose className={s.closeBtn} />
                </button>
                
                <h2 className={s.modal_title}>
                    {mode === 'register' ? 'Registration' : 'Log In'}
                </h2>
                <p className={s.modal_text}>
                    {mode === 'register' ?
                        'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information' :
                        'Welcome back! Please enter your credentials to access your account and continue your search for an teacher.'}
                </p>
                <form
                    className={s.modal_form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {mode === 'register' && (
                        <>
                            <input
                                className={s.modal_form_input}
                                type="text"
                                placeholder="Name"
                                aria-invalid={!!errors.email}
                                {...register("name")}
                            />
                            {errors.name && <p className={s.err}>{errors.name.message}</p>}
                        </>
                        
                    )}
                    <input className={s.modal_form_input} type="email" placeholder="Email" {...register("email")} />
                    {errors.email && <p className={s.err}>{errors.email.message}</p>}
                    <input className={s.modal_form_input} type="password" placeholder="Password" {...register("password")} />
                    {errors.password && <p className="err">{errors.password.message}</p>}
                    <button
                        className={s.modal_form_btn}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : mode === 'login' ? 'Log in' : 'Sign up'}
                    </button>
                </form>
            </div>
        </div>
        
    )
}