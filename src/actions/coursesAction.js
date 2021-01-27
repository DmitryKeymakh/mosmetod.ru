export const SET_COURSES_DATA = '@@courses/SET_COURSES_DATA';

export const setCoursesData = (coursesData) => ({
    type: SET_COURSES_DATA,
    coursesData,
});

export const SET_COURSES_DATA_ID = '@@courses/SET_COURSES_DATA_ID';

export const setCoursesDataId = (coursesDataId) => ({
    type: SET_COURSES_DATA_ID,
    coursesDataId,
});