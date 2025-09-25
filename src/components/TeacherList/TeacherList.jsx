import { useSelector } from "react-redux"
import { SelectTeachers } from "../../redux/teachers/selectors"
import { TeacherCard } from "../TeacherCard/TeacherCard";

import s from './TeacherList.module.css'

export const TeacherList = () => {
    const teachers = useSelector(SelectTeachers);

    return (
        <ul className={s.teacherList}>
            {teachers.map((teacher, i) => (
                <li key={`${teacher.name}_${teacher.surname}`} data-teacher-idx={i}>
                    <TeacherCard teacher={teacher} />
                </li>
                
            ))}
        </ul>
    )
}