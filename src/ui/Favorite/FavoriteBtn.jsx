import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectIsFavTeacher } from "../../redux/favorites/selectors";
import { toggleFavoriteByTeacher } from "../../redux/favorites/slice";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { openAuthRequiredModal } from "../../redux/modal/slice";

export const FavoriteBtn = ({ teacher, className, onClick }) => {
  const dispatch = useDispatch();
  const isFav = useSelector(makeSelectIsFavTeacher(teacher));
  const isAuthorized = useSelector(selectIsLoggedIn);

  const handleClick = (e) => {
    onClick?.(e);
    e.stopPropagation();
    if (!isAuthorized) {
      dispatch(openAuthRequiredModal());
      return;
    }
    dispatch(toggleFavoriteByTeacher(teacher));
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      aria-pressed={isFav}
    >
      {isFav ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};
