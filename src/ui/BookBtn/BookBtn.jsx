import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";
import { openBookModal } from "../../redux/modal/slice";

export const BookBtn = ({ className, teacher }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const onBook = () => {
        const params = new URLSearchParams(location.search);
        params.set('book', teacher.id);

        navigate(
            {
                pathname: location.pathname,
                search: params.toString()
            }, {
                state: {from: location.pathname + location.search},
                replace: true
        });
        dispatch(openBookModal(teacher));
    }

    return <button className={className} onClick={onBook}>Book trial lesson</button>
}