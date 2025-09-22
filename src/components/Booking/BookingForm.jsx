import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { selectBookedTeacher, selectBookModal } from '../../redux/modal/selectors';
import { useCallback } from 'react';
import { closeModal } from '../../redux/modal/slice';
import { selectUser } from '../../redux/auth/selectors';
import { createBooking } from '../../firebase/booking';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ModalWrap } from '../../ui/ModalWrap/ModalWrap';

import s from './BookingForm.module.css'
import { SubmitBtn } from '../../ui/SubmitBtn/SubmitBtn';

const validationBookingSchema = Yup.object().shape({
    reason: Yup.string().required('Select a reason'),
    name: Yup.string().required('Name is required'),
    email: Yup.string()
        .email('Must be a valid email')
        .required('Email is required'),
    phone: Yup.string().required('Phone number is required')
})

export function BookingForm() {
    const dispatch = useDispatch();
    const mode = useSelector(selectBookModal);
    const isOpen = !!mode; 

    const user = useSelector(selectUser);
    const teacher = useSelector(selectBookedTeacher)

    const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    } = useForm({
        resolver: yupResolver(validationBookingSchema),
        mode: 'onTouched',
        defaultValues: { reason: 'career and business' },
    });

    const baseClose = useCallback(() => {
        reset();
        dispatch(closeModal());
    }, [dispatch, reset]);
    
    if (!isOpen || !teacher) return null;

    const onSubmit = async (data) => {
        try {
            await createBooking({ form: data, teacher, user });
            toast.success("BOOKING CONFIRMED. Soon you will receive an email confirming your booking details");
            baseClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to book")
        }
    }

    return (
        <ModalWrap
            className={s.booking_modal}
            isOpen={isOpen}
            onBaseClose={baseClose}
            title="Book trial lesson"
            description="Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs."
            queryKey="book"
        >
            <div className={s.teacher}>
                <img
                    src={teacher.avatar_url}
                    alt={`Teacher ${teacher.name} ${teacher.surname}`}
                    className={s.teacher_photo}
                />
                <p className={s.teacher_txt}>Your teacher</p>
                <p className={s.teacher_name}>{`${teacher.name} ${teacher.surname}`}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className={s.reason_title}>
                    What is your main reason for learning English?
                </h3>
                <div className={s.reason_list}>
                    <label className={s.reason_item} htmlFor="reason-career">
                        <input
                            id="reason-career"
                            type="radio"
                            name="reason"
                            className={s.custom_radio}
                            value="career and business"
                            {...register("reason")}
                        />
                        Career and business
                    </label>
                    <label className={s.reason_item} htmlFor="reason-kids">
                        <input
                            id='reason-kids'
                            className={s.custom_radio}
                            type="radio"
                            name="reason"
                            value="lesson for kids"
                            {...register("reason")}
                        />
                        Lesson for kids
                    </label>
                    <label className={s.reason_item} htmlFor="reason-living-abroad">
                        <input
                            id='reason-living-abroad'
                            className={s.custom_radio}
                            type="radio"
                            name="reason"
                            value="living abroad"
                            {...register("reason")}
                        />
                        Living abroad
                    </label>
                    
                    <label className={s.reason_item} htmlFor="reason-exams">
                        <input
                            type="radio"
                            id="reason-exams"
                            className={s.custom_radio}
                            name="reason"
                            value="exams and coursework"
                            {...register("reason")}
                        />
                        Exams and coursework
                    </label>
                    
                    <label className={s.reason_item} htmlFor="reason-travel">
                        <input
                            id='reason-travel'
                            className={s.custom_radio}
                            type="radio"
                            name="reason"
                            value="culture, travel or hobby"
                            {...register("reason")}
                        />
                        Culture, travel or hobby
                    </label>
                </div>
                <div className={s.modal_form}>
                    <input
                        className={s.modal_form_input}
                        type="text"
                        placeholder='Full name'
                        aria-invalid={!!errors.name}
                        {...register("name")}
                    />
                    {errors.name && <p>{errors.name.message}</p>}

                    <input
                        className={s.modal_form_input}
                        type="email"
                        placeholder='Email'
                        aria-invalid={!!errors.email}
                        {...register("email")}
                    />
                    {errors.email && <p>{errors.email.message}</p>}

                    <input
                        className={s.modal_form_input}
                        type="tel"
                        placeholder='Phone number'
                        aria-invalid={!!errors.phone}
                        {...register("phone")}
                    />
                    {errors.phone && <p>{errors.phone.message}</p>}
                </div>
                

                <SubmitBtn>
                    {isSubmitting ? 'Booking…' : 'Book'}
                </SubmitBtn>

            </form>
        </ModalWrap>
    )
}