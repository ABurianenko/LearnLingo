const SelectTeachers = state => state.teachers.items;
const TeachersError = state => state.teachers.error;
const TeachersIsLoading = state => state.teachers.isLoading;
const SelectPages = state => state.teachers.page;
const SelectLimit = state => state.teachers.limit;
const SelectTotalPages = state => state.teachers.totalPages;

export {SelectTeachers, TeachersError, TeachersIsLoading, SelectPages, SelectLimit, SelectTotalPages}