import { makeTeacherKey } from "../../utils/teacherKey";

export const selectFavoriteKeys = (s) => s.favorites.keys;
export const makeSelectIsFavTeacher = (teacher) => (s) =>
  s.favorites.keys.includes(makeTeacherKey(teacher));