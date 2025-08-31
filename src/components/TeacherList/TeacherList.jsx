import { useSelector } from "react-redux"
import { SelectTeachers } from "../../redux/teachers/selectors"
import { TeacherCard } from "../TeacherCard/TeacherCard";

import s from './TeacherList.module.css'

export const TeacherList = () => {
    const teachers = useSelector(SelectTeachers);

    return (
        <ul className={s.teacherList}>
            {teachers.map((teacher, i) => (
                <TeacherCard key={i} teacher={teacher} />
            ))}
        </ul>
    )
}