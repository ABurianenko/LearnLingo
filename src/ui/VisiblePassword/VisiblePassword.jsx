import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

import s from './VisiblePwd.module.css'

export const VisiblePassword = ({visible, onToggle}) => {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            className={s.eye}
        >
            {visible ? <FaRegEye /> : <FaRegEyeSlash /> }
        </button>
    )
}