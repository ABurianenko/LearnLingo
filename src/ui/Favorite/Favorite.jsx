// import { useState } from "react";
// import { FaRegHeart, FaHeart } from "react-icons/fa";

// export const FavoriteBtn = () => {
//     const [favorite, setFavorite] = useState(false);

//     const toggleFavorite = (teacherId) => {
//         setFavorite((prev) =>
//             prev.includes(teacherId) ? prev.filter((id) => id !== teacherId) : [...prev, teacherId]
//         );
//     };

//     <button onClick={toggleFavorite}>
//         {favorite ? <FaHeart /> : <FaRegHeart />} 
//     </button>
// } 