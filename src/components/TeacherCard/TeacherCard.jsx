import { IoBookOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

export const TeacherCard = ({ teacher }) => {
    const [showMore, setShowMore] = useState(false);

    const clickReadMoreBtn = () => {
        setShowMore(v => !v)
    }

    const reviews = Array.isArray(teacher.reviews) ? teacher.reviews : []
    const length = reviews.length;
    

    return (
        <div>
            <div>
                <img src={teacher.avatar_url} alt={`Teacher ${teacher.name} ${teacher.surname}`} width="24px" height="24px" />
            </div>
            <div>
                <p>Languages</p>
                <div>
                    <IoBookOutline />
                    <p>Lessons online</p>
                </div>
                <p>Lessons done: {teacher.lessons_done}</p>
                <div>
                    <FaStar />
                    <p>Rating: {teacher.rating}</p>
                </div>
                <p>Price / 1 hour: {teacher.price_per_hour}</p>
            </div>
            <h3>{`${teacher.name} ${teacher.surname}`}</h3>
            <p>Speaks: </p>
            {teacher.languages.map((language, idx) => (
                <li key={idx}>
                    {language}
                </li>
            ))}
            <p>Lesson info: {teacher.lesson_info}</p>
            <p>Conditions: </p>
            {teacher.conditions.map((condition, idx) => (
                <li key={idx}>
                    {condition}
                </li>
            ))}
            
            <button onClick={clickReadMoreBtn}>
                Read more
            </button>
            {showMore && (
                <div>
                    <p>{teacher.experience}</p>
                    {reviews.slice(0, length).map(({ comment, reviewer_name, reviewer_rating }, idx) => (
                        <li key={idx}>
                            <div>
                                <p>{reviewer_name}</p>
                                <FaStar />
                                <p>{reviewer_rating}</p>
                            </div>
                            <p>{comment}</p>
                        </li>
                    ))}
                </div>
            )}

            {teacher.levels.map((level, idx) => (
                <li key={idx}>
                    {level}
                </li>
            ))}
        </div>
    )
}