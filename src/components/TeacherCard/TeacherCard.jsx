import { IoBookOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

export const TeacherCard = ({ teacher }) => {
    return (
        <div>
            <div>
                <img src={teacher.avatar_url} alt={`Teacher ${teacher.name} ${teacher.surname}`} />
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
            <p>Speaks: {teacher.languages}</p>
            <p>Lesson info: {teacher.lesson_info}</p>
            <p>Conditions: {teacher.conditions}</p>
            <div>
                <p>{teacher.experience}</p>
            </div>
        </div>
    )
}