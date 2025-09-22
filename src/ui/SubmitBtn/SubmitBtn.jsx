import s from './SubmitBtn.module.css';

export const SubmitBtn = ({ children }) => {
    return <button
        className={s.modal_form_btn}
        type="submit"
    >
        {children}
    </button>
}