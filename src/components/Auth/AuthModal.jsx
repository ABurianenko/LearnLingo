import { useDispatch, useSelector } from "react-redux"
import { useCallback,  useMemo, useState } from "react";

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

import { ModalWrap } from "../../ui/ModalWrap/ModalWrap";
import { loginUser, registerUser } from "../../redux/auth/operations";
import { selectAuthModal } from "../../redux/modal/selectors";
import { closeModal } from "../../redux/modal/slice";
import { VisiblePassword } from "../../ui/VisiblePassword/VisiblePassword";

import s from './AuthModal.module.css';
import { SubmitBtn } from "../../ui/SubmitBtn/SubmitBtn";


const validationRegisterSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .email('Must be a valid email')
        .required('Email is required'),
    password: Yup.string()
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            "Password must contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
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

    const isOpen = !!mode;
    
    const [showPwd, setShowPwd] = useState(false);

    const schema = useMemo(() => (mode === 'register' ? validationRegisterSchema : validationLoginSchema), [mode]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({ resolver: yupResolver(schema), mode: 'onTouched' });

    const baseClose = useCallback(() => {
        reset();
        dispatch(closeModal());
    }, [dispatch, reset]);
    
    if (!isOpen) return null;

    const onSubmit = async (data) => {
        try {
            if (mode === 'login') {
                await dispatch(loginUser({ email: data.email, password: data.password })).unwrap();
            } else {
                await dispatch(registerUser({ displayName: data.name, email: data.email, password: data.password })).unwrap();
                toast("Your account has been successfully created")
            }
            baseClose();
            
        } catch (err) {
            console.error(err);
            toast("Email or password is not valid")
        }
    }

    return (
        <ModalWrap
            isOpen={isOpen}
            onBaseClose={baseClose}
            title={mode === "register" ? "Registration" : "Log in"}
            description={mode === "register"
                ? "Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information"
                : "Welcome back! Please enter your credentials to access your account and continue your search for an teacher."
            }
            queryKey="auth"
        >
            <Toaster />
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
                            aria-invalid={!!errors.name}
                            {...register("name")}
                        />
                        {errors.name && <p className={s.err}>{errors.name.message}</p>}
                    </>
                    
                )}
                <input className={s.modal_form_input} type="email" placeholder="Email" {...register("email")} />
                {errors.email && <p className={s.err}>{errors.email.message}</p>}
                <div className={s.modal_form_input_wrap}>
                    <input className={s.modal_form_input} type={showPwd ? "text" : "password"} placeholder="Password" {...register("password")} />
                    <div className={s.modal_form_toggle}>
                        <VisiblePassword visible={showPwd} onToggle={() => setShowPwd(v => !v)} />
                    </div>
                </div>
                
                {errors.password && <p className={s.err}>{errors.password.message}</p>}
                <SubmitBtn
                >
                    {isSubmitting ? 'Submitting...' : mode === 'login' ? 'Log in' : 'Sign up'}
                </SubmitBtn>
            </form>
        </ModalWrap>
    )
}