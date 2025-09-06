import { useDispatch } from "react-redux"
import { openBookModal } from "../../redux/modal/slice";

export const BookBtn = ({ className, teacher }) => {
    const dispatch = useDispatch();

    return <button className={className} onClick={() => dispatch(openBookModal(teacher))}>Book trial lesson</button>
}