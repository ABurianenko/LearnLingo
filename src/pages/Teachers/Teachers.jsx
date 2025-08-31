import { useDispatch, useSelector } from "react-redux";
import { SelectLimit, SelectPages, SelectTeachers, SelectTotalPages, TeachersError, TeachersIsLoading } from "../../redux/teachers/selectors";
import { useEffect, useRef } from "react";
import { fetchTeachers } from "../../redux/teachers/operations";
import { TeacherList } from "../../components/TeacherList/TeacherList";

export const Teachers = () => {
    const dispatch = useDispatch();
    
    const isLoading = useSelector(TeachersIsLoading);
    const error = useSelector(TeachersError);
    const page = useSelector(SelectPages);
    const limit = Number(useSelector(SelectLimit));
    const totalPages = useSelector(SelectTotalPages);

    const LoadMoreButtonRef = useRef(null);
    const prevPageRef = useRef(page);

    const handlePageChange = (newPage) => {
        dispatch(fetchTeachers({page: newPage, limit}))
    }

    useEffect(() => {
        dispatch(fetchTeachers({ page: 1, limit }));
    }, [dispatch, limit]);

    useEffect(() => {
        if (prevPageRef.current !== page && page !== 1 && LoadMoreButtonRef.current) {
            LoadMoreButtonRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})
        }
    }, [page])

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Failed to load teachers</p>}
            <div>
                <TeacherList />
                <button
                    ref={LoadMoreButtonRef}
                    onClick={() => handlePageChange(page+1)}
                    disabled={page>=totalPages}
                >
                    Load more
                </button>
            </div>
        </div>
    )
}