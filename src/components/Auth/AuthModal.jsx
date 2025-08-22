import { useDispatch, useSelector } from "react-redux"
import { loginUser, registerUser } from "../../redux/auth/operations";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { selectAuthModal } from "../../redux/modal/selectors";
import { useEffect, useRef } from "react";
import { closeModal } from "../../redux/modal/slice";

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
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
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
    
    if (!mode) return null;

    useEffect(() => {
        previouslyFocused.current = document.activeElement;
        document.body.style.overflow = ' hidden';
        setTimeout(() => dialogRef.current.querySelector('input').focus(), 0);
        return () => {
            document.body.style.overflow = '';
            previouslyFocused.current && previouslyFocused.current.focus();
        }
    }, [])

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') {
                onclose();
            }
            if (e.key === 'Tab') {
                const focusedEl = dialogRef.current.querySelectorAll(
                    'button, input'
                );
                const first = focusedEl[0];
                const last = focusedEl[focusedEl - 1];
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
        return () => document.removeEventListener('keydown', onKeyDown);
    }, []);

    const onClose = () => {
        reset();
        dispatch(closeModal());
    };

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
        <div>
            <IoMdClose />
            <h2>
                {mode === 'register' ? 'Registration' : 'Log In'}
            </h2>
            <p>
                {mode === 'register' ?
                    'Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information' :
                    'Welcome back! Please enter your credentials to access your account and continue your search for an teacher.'}
            </p>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                {mode === 'register' && (
                    <input defaultValue="Name" {...register("name")} />
                )}
                <input defaultValue="Email" {...register("email")} />
                <input defaultValue="Password" {...register("password")} /> 
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : mode === 'login' ? 'Log in' : 'Sign up'}
                </button>
            </form>
        </div>
    )
}