import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFavoriteKeys } from "../../redux/favorites/selectors";
import { SelectTeachers } from "../../redux/teachers/selectors";
import { fetchTeachers } from "../../redux/teachers/operations";
import { makeTeacherKey } from "../../utils/teacherKey";
import { TeacherCard } from "../../components/TeacherCard/TeacherCard";

export const Favorites = () => {
    const dispatch = useDispatch();
    const favKeys = useSelector(selectFavoriteKeys);
    const teachers = useSelector(SelectTeachers);

    useEffect(() => {
        if (!teachers || teachers.length === 0) {
        dispatch(fetchTeachers({ page: 1, limit: 1000 }));
        }
    }, [dispatch, teachers]);

    const list = useMemo(() => {
        if (!Array.isArray(teachers)) return [];
        const set = new Set(favKeys);
        return teachers.filter(t => set.has(makeTeacherKey(t)));
    }, [teachers, favKeys]);

    if (favKeys.length === 0) return <p>No favorites yet.</p>;

    return (
        <div className="container">
            <ul>
                {list.map(t => <TeacherCard key={makeTeacherKey(t)} teacher={t} />)}
            </ul>
        </div>
        
    );
};
