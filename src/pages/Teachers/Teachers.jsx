import { useDispatch, useSelector } from "react-redux";
import { SelectTeachers, TeachersError, TeachersIsLoading } from "../../redux/teachers/selectors";
import { useEffect } from "react";
import { fetchTeachers } from "../../redux/teachers/operations";
import { TeacherCard } from "../../components/TeacherCard/TeacherCard";

export const Teachers = () => {
    const dispatch = useDispatch();

    const teachers = useSelector(SelectTeachers);
    const isLoading = useSelector(TeachersIsLoading);
    const error = useSelector(TeachersError);

    useEffect(() => {
        dispatch(fetchTeachers());
    }, [dispatch])

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Failed to load teachers</p>}
            {teachers.map((teacher) => (
                <TeacherCard 
                    key={`${teacher.name}_${teacher.surname}`}
                    teacher={teacher}
                />
            ))}
        </div>
    )
}