import api from "../assets/api";
import axios from "axios";

export const SET_TEACHING_SPACE_NAME = '@@teaching-space/SET_TEACHING_SPACE_NAME';

export const setTeachingSpaceName = (teachingSpaceInfo) => ({
    type: SET_TEACHING_SPACE_NAME,
    teachingSpaceInfo,
});

export const SET_TEACHING_SPACE_SUBSCRIBE_RESULT = '@@teaching-space/SET_TEACHING_SPACE_SUBSCRIBE_RESULT';

export const setTeachingSpaceSubscribeResult = (subscribeResult) => ({
    type: SET_TEACHING_SPACE_SUBSCRIBE_RESULT,
    subscribeResult,
});

export const SET_TEACHING_SPACE_DATA = '@@teaching-space/SET_TEACHING_SPACE_DATA';

export const setTeachingSpaceData = (data) => ({
    type: SET_TEACHING_SPACE_DATA,
    data,
});

export const SET_MORE_TEACHING_SPACE_DATA = '@@teaching-space/SET_MORE_TEACHING_SPACE_DATA';

export const setMoreTeachingSpaceData = (data) => ({
    type: SET_MORE_TEACHING_SPACE_DATA,
    data,
});

export const SET_TOTAL_ITEMS_COUNT = '@@teaching-space/SET_TOTAL_ITEMS_COUNT';

export const setTotalItemsCount = (totalItemsCount) => ({
    type: SET_TOTAL_ITEMS_COUNT,
    totalItemsCount,
});

export const SET_START_DATE_RANGE = '@@teaching-space/SET_START_DATE_RANGE';

export const setStartDateRange = (startDateRange) => ({
    type: SET_START_DATE_RANGE,
    startDateRange,
});

export const SET_END_DATE_RANGE = '@@teaching-space/SET_END_DATE_RANGE';

export const setEndDateRange = (endDateRange) => ({
    type: SET_END_DATE_RANGE,
    endDateRange,
});

export const SET_SHOW_DROP_DOWN = '@@teaching-space/SET_SHOW_DROP_DOWN';

export const setShowDropDown = (showDropDown) => ({
    type: SET_SHOW_DROP_DOWN,
    showDropDown,
});

export const SET_TIME_FILTER = '@@teaching-space/SET_TIME_FILTER';

export const setTimeFilter = (timeFilter) => ({
    type: SET_TIME_FILTER,
    timeFilter,
});

export const SET_CURRENT_PAGE = '@@teaching-space/SET_CURRENT_PAGE';

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage,
});

export const SET_MATERIALS_CATEGORY = '@@teaching-space/SET_MATERIALS_CATEGORY';

export const setMaterialsCategory = (materialsCategory) => ({
    type: SET_MATERIALS_CATEGORY,
    materialsCategory,
});

export const SET_MATERIALS_FILTERS = '@@teaching-space/SET_MATERIALS_FILTERS';

export const setMaterialsFilters = (materialsFilters) => ({
    type: SET_MATERIALS_FILTERS,
    materialsFilters,
});

export const SET_ERROR = '@@teaching-space/SET_ERROR';

export const setError = (isError) => ({
    type: SET_ERROR,
    isError,
});


export const setTeachingSpaceInfo = (teachingSpaceCategory) => {
    return (dispatch, getState) => {

        const category = getState().teachingSpaceReducer.materialsCategory;
        const page = getState().teachingSpaceReducer.currentPage;
        const time = getState().teachingSpaceReducer.timeFilter;

        const materialsListNameUrl = `${api.teachingSpaceMaterialsListName}?id=${teachingSpaceCategory}`;

        if (category === 0 && time === 'all' && page === 1) {
            const fetchData = async () => {
                const result = await axios(
                    materialsListNameUrl,
                );
                dispatch(setTeachingSpaceName(result.data));
            };
            fetchData();
        }
    }
};


export const submitSubscribe = (email, id_category_parent) => {
    return (dispatch) => {

        const subscribeResultUrl = `${api.teachingSpaceSubscribe}?email=${email}&category=${id_category_parent}`;

        const fetchData = async () => {
            const result = await axios(
                subscribeResultUrl,
            );
            dispatch(setTeachingSpaceSubscribeResult(result.data.result));
        };
        fetchData();
    }
};

export const setInitialTeachingSpaceData = (teachingSpaceCategory) => {
    return (dispatch, getState) => {

        const category = getState().teachingSpaceReducer.materialsCategory;
        const page = getState().teachingSpaceReducer.currentPage;
        const time = getState().teachingSpaceReducer.timeFilter;

        const allFiltersUrl = `${api.teachingSpaceMaterialsList}?id=${teachingSpaceCategory}&category=${category}&time=${time}&page=${page}`;
        const materialsListFiltersUrl = `${api.teachingSpaceMaterialsFilters}?id=${teachingSpaceCategory}`;
        const totalCountUrl = `${api.teachingSpaceMaterialsQuantity}?id=${teachingSpaceCategory}&category=${category}&time=${time}`;

        if (category === 0 && time === 'all' && page === 1) {
            const fetchData = async () => {
                try {
                    const result = await axios(
                        allFiltersUrl,
                    );
                    dispatch(setTeachingSpaceData(result.data));

                    const result2 = await axios(
                        totalCountUrl,
                    );
                    dispatch(setTotalItemsCount(result2.data.newsPageCount));

                    const result3 = await axios(
                        materialsListFiltersUrl,
                    );
                    dispatch(setMaterialsFilters(result3.data));

                    dispatch(setError(false));

                } catch (error) {
                    dispatch(setError(true));
                }
            };
            fetchData();
        }
    }
};

export const uploadTeachingSpaceData = (teachingSpaceCategory) => {
    return (dispatch, getState) => {

        const category = getState().teachingSpaceReducer.materialsCategory;
        const page = getState().teachingSpaceReducer.currentPage + 1;
        const time = getState().teachingSpaceReducer.timeFilter;
        const startDate = getState().teachingSpaceReducer.startDateRange;
        const endDate = getState().teachingSpaceReducer.endDateRange;

        dispatch(setCurrentPage(page));

        const handleStartDate = () => {
            if (startDate) {
                return `&date_start=${startDate}`
            } else return '';
        }

        const handleEndDate = () => {
            if (endDate) {
                return `&date_end=${endDate}`
            } else return '';
        }

        const handleTime = () => {
            if (time) {
                return `&time=${time}`
            } else return '';
        }

        const allFiltersUrl = `${api.teachingSpaceMaterialsList}?id=${teachingSpaceCategory}&category=${category}${handleStartDate()}${handleEndDate()}${handleTime()}&page=${page}`;

        const fetchData = async () => {
            const result = await axios(
                allFiltersUrl,
            );
            dispatch(setMoreTeachingSpaceData(result.data));
        };
        fetchData();
    }
};

export const changeTeachingSpaceCategoryFilter = (teachingSpaceCategory, filter) => {
    return (dispatch, getState) => {

        const page = 1;
        const time = getState().teachingSpaceReducer.timeFilter;
        const startDate = getState().teachingSpaceReducer.startDateRange;
        const endDate = getState().teachingSpaceReducer.endDateRange;

        dispatch(setCurrentPage(page));
        dispatch(setMaterialsCategory(filter));

        const handleStartDate = () => {
            if (startDate) {
                return `&date_start=${startDate}`
            } else return '';
        }

        const handleEndDate = () => {
            if (endDate) {
                return `&date_end=${endDate}`
            } else return '';
        }

        const handleTime = () => {
            if (time) {
                return `&time=${time}`
            } else return '';
        }

        const allFiltersUrl = `${api.teachingSpaceMaterialsList}?id=${teachingSpaceCategory}&category=${filter}${handleStartDate()}${handleEndDate()}${handleTime()}&page=${page}`;
        const totalCountUrl = `${api.teachingSpaceMaterialsQuantity}?id=${teachingSpaceCategory}&category=${filter}${handleStartDate()}${handleEndDate()}${handleTime()}`;

        const fetchData = async () => {
            const result = await axios(
                allFiltersUrl,
            );
            dispatch(setTeachingSpaceData(result.data));

            const result2 = await axios(
                totalCountUrl,
            );
            dispatch(setTotalItemsCount(result2.data.newsPageCount));
        }
        fetchData();
    }
};

export const changeTeachingSpaceTimeFilter = (teachingSpaceCategory, time, startDate, endDate) => {
    return (dispatch, getState) => {

        const page = 1;
        const category = getState().teachingSpaceReducer.materialsCategory;

        dispatch(setCurrentPage(page));
        dispatch(setTimeFilter(time));
        dispatch(setStartDateRange(startDate));
        dispatch(setEndDateRange(endDate));

        const handleStartDate = () => {
            if (startDate) {
                return `&date_start=${startDate}`
            } else return '';
        }

        const handleEndDate = () => {
            if (endDate) {
                return `&date_end=${endDate}`
            } else return '';
        }

        const handleTime = () => {
            if (time) {
                return `&time=${time}`
            } else return '';
        }

        const allFiltersUrl = `${api.teachingSpaceMaterialsList}?id=${teachingSpaceCategory}&category=${category}${handleStartDate()}${handleEndDate()}${handleTime()}&page=${page}`;
        const totalCountUrl = `${api.teachingSpaceMaterialsQuantity}?id=${teachingSpaceCategory}&category=${category}${handleStartDate()}${handleEndDate()}${handleTime()}`;

        const fetchData = async () => {
            const result = await axios(
                allFiltersUrl,
            );
            dispatch(setTeachingSpaceData(result.data));

            const result2 = await axios(
                totalCountUrl,
            );
            dispatch(setTotalItemsCount(result2.data.newsPageCount));
        };
        fetchData();
    }
};