import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectIsFavTeacher } from "../../redux/favorites/selectors";
import { toggleFavoriteByTeacher } from "../../redux/favorites/slice";

export const FavoriteBtn = ({ teacher, className, onClick }) => {
  const dispatch = useDispatch();
  const isFav = useSelector(makeSelectIsFavTeacher(teacher));

  const handleClick = (e) => {
    onClick?.(e);
    e.stopPropagation();
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
