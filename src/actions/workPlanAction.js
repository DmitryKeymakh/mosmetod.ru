import api from "../assets/api";
import axios from "axios";

export const SET_WORK_PLAN_QUERY = '@@work-plan/SET_WORK_PLAN_QUERY';

export const setWorkPlanQuery = (query) => ({
    type: SET_WORK_PLAN_QUERY,
    query,
});

export const SET_WORK_PLAN_DATA = '@@work-plan/SET_WORK_PLAN_DATA';

export const setWorkPlanData = (data) => ({
    type: SET_WORK_PLAN_DATA,
    data,
});

export const SET_MORE_WORK_PLAN_DATA = '@@work-plan/SET_MORE_WORK_PLAN_DATA';

export const setMoreWorkPlanData = (data) => ({
    type: SET_MORE_WORK_PLAN_DATA,
    data,
});

export const SET_TOTAL_ITEMS_COUNT = '@@work-plan/SET_TOTAL_ITEMS_COUNT';

export const setTotalItemsCount = (totalItemsCount) => ({
    type: SET_TOTAL_ITEMS_COUNT,
    totalItemsCount,
});

export const SET_START_DATE_RANGE = '@@work-plan/SET_START_DATE_RANGE';

export const setStartDateRange = (startDateRange) => ({
    type: SET_START_DATE_RANGE,
    startDateRange,
});

export const SET_END_DATE_RANGE = '@@work-plan/SET_END_DATE_RANGE';

export const setEndDateRange = (endDateRange) => ({
    type: SET_END_DATE_RANGE,
    endDateRange,
});

export const SET_FILTER_URL = '@@work-plan/SET_FILTER_URL';

export const setFilterUrl = (filterUrlPart, partString) => ({
    type: SET_FILTER_URL,
    filterUrlPart,
    partString,
});

export const SET_EVENT_TYPE_FILTER = '@@work-plan/SET_EVENT_TYPE_FILTER';

export const setEventTypeFilter = (checkedFilter) => ({
    type: SET_EVENT_TYPE_FILTER,
    checkedFilter,
});

export const SET_FOR_WHOM_FILTER = '@@work-plan/SET_FOR_WHOM_FILTER';

export const setForWhomFilter = (checkedFilter) => ({
    type: SET_FOR_WHOM_FILTER,
    checkedFilter,
});

export const SET_SELECTED_OPTION = '@@work-plan/SET_SELECTED_OPTION';

export const setSelectedOption = (selectedOption) => ({
    type: SET_SELECTED_OPTION,
    selectedOption,
});

export const DELETE_FILTER_URL = '@@work-plan/DELETE_FILTER_URL';

export const deleteFilterUrl = (filterUrlPart) => ({
    type: DELETE_FILTER_URL,
    filterUrlPart
});

export const SET_SELECT_URL_PART = '@@work-plan/SET_SELECT_URL_PART';

export const setSelectUrlPart = (selectUrlPart) => ({
    type: SET_SELECT_URL_PART,
    selectUrlPart,
});

export const TOGGLE_SWITCH = '@@work-plan/TOGGLE_SWITCH';

export const toggleSwitch = (switchValue) => ({
    type: TOGGLE_SWITCH,
    switchValue,
});

export const SET_PAGE_SIZE = '@@work-plan/SET_PAGE_SIZE';

export const setPageSize = (pageSize) => ({
    type: SET_PAGE_SIZE,
    pageSize,
});

export const SET_CURRENT_PAGE = '@@work-plan/SET_CURRENT_PAGE';

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage,
});

export const SET_SCROLL_MODE = '@@work-plan/SET_SCROLL_MODE';

export const setScrollMode = (infiniteScroll) => ({
    type: SET_SCROLL_MODE,
    infiniteScroll,
});

export const SET_FILTER_SHOW = '@@work-plan/SET_FILTER_SHOW';

export const setFilterShow = (filterShow) => ({
    type: SET_FILTER_SHOW,
    filterShow,
});


export const setInitialWorkPlanData = () => {
    return (dispatch, getState) => {
        const eventsList = getState().workPlanReducer.data;
        const startDate = getState().workPlanReducer.startDateRange;
        const endDate = getState().workPlanReducer.endDateRange;
        const pageSize = getState().workPlanReducer.pageSize;
        const query = getState().workPlanReducer.query;
        const currentPage = getState().workPlanReducer.currentPage;
        const filtersList = getState().workPlanReducer.filterUrl.join('');
        const selectUrlPart = getState().workPlanReducer.selectUrlPart;

        const allFiltersUrl = `${api.workPlanResultList}?date_start=${startDate}&date_end=${endDate}&count=${pageSize}&search=${query}&page=${currentPage + 1}`;
        const quantityUrl = `${api.workPlanQuantity}?date_start=${startDate}&date_end=${endDate}${filtersList}${selectUrlPart}&search=${query}`;

        if (eventsList.length === 0 && query === '' && currentPage === 0 && filtersList.length === 0 && selectUrlPart === '') {
            const fetchData = async () => {
                const result = await axios(
                    allFiltersUrl,
                );
                dispatch(setWorkPlanData(result.data));

                const result2 = await axios(
                    quantityUrl,
                );
                dispatch(setTotalItemsCount(result2.data.eventsWorkPlanCount));
            };
            fetchData();
        }
    }
};

export const uploadWorkPlanData = () => {
    return (dispatch, getState) => {
        const startDate = getState().workPlanReducer.startDateRange;
        const endDate = getState().workPlanReducer.endDateRange;
        const pageSize = getState().workPlanReducer.pageSize;
        const query = getState().workPlanReducer.query;
        const page = getState().workPlanReducer.currentPage + 1;
        const filtersList = getState().workPlanReducer.filterUrl.join('');
        const selectUrlPart = getState().workPlanReducer.selectUrlPart;

        dispatch(setCurrentPage(page));

        const allFiltersUrl = `${api.workPlanResultList}?date_start=${startDate}&date_end=${endDate}${filtersList}${selectUrlPart}&count=${pageSize}&search=${query}&page=${page + 1}`;

        const fetchData = async () => {
            const result = await axios(
                allFiltersUrl,
            );
            dispatch(setMoreWorkPlanData(result.data));
        };
        fetchData();
    }
};

export const setWorkPlanCurrentPage = (page) => {
    return (dispatch, getState) => {
        const startDate = getState().workPlanReducer.startDateRange;
        const endDate = getState().workPlanReducer.endDateRange;
        const pageSize = getState().workPlanReducer.pageSize;
        const query = getState().workPlanReducer.query;
        const filtersList = getState().workPlanReducer.filterUrl.join('');
        const selectUrlPart = getState().workPlanReducer.selectUrlPart;

        const allFiltersUrl = `${api.workPlanResultList}?date_start=${startDate}&date_end=${endDate}${filtersList}${selectUrlPart}&count=${pageSize}&search=${query}&page=${page + 1}`;

        dispatch(setCurrentPage(page));

        const fetchData = async () => {
            const result = await axios(
                allFiltersUrl,
            );
            dispatch(setWorkPlanData(result.data));
        };
        fetchData();
    }
};

export const setWorkPlanPageSize = (scrollMode, pageSize) => {
    return (dispatch, getState) => {
        const page = 0;
        const currentPageSize = getState().workPlanReducer.pageSize;
        const currentScrollMode = getState().workPlanReducer.infiniteScroll;
        const startDate = getState().workPlanReducer.startDateRange;
        const endDate = getState().workPlanReducer.endDateRange;
        const query = getState().workPlanReducer.query;
        const filtersList = getState().workPlanReducer.filterUrl.join('');
        const selectUrlPart = getState().workPlanReducer.selectUrlPart;

        const allFiltersUrl = `${api.workPlanResultList}?date_start=${startDate}&date_end=${endDate}${filtersList}${selectUrlPart}&count=${pageSize}&search=${query}&page=${page + 1}`;

        if (currentPageSize !== pageSize && currentScrollMode !== scrollMode) {
            const fetchData = async () => {
                const result = await axios(
                    allFiltersUrl,
                );
                dispatch(setWorkPlanData(result.data));
                dispatch(setPageSize(pageSize));
                dispatch(setCurrentPage(page));
                dispatch(setScrollMode(scrollMode));
            };
            fetchData();
        }
    }
};

export const changeWorkPlanFilters = () => {
    return (dispatch, getState) => {
        const page = 0;
        const startDate = getState().workPlanReducer.startDateRange;
        const endDate = getState().workPlanReducer.endDateRange;
        const pageSize = getState().workPlanReducer.pageSize;
        const query = getState().workPlanReducer.query;
        const filtersList = getState().workPlanReducer.filterUrl.join('');
        const selectUrlPart = getState().workPlanReducer.selectUrlPart;

        const allFiltersUrl = `${api.workPlanResultList}?date_start=${startDate}&date_end=${endDate}${filtersList}${selectUrlPart}&count=${pageSize}&search=${query}&page=${page + 1}`;
        const quantityUrl = `${api.workPlanQuantity}?date_start=${startDate}&date_end=${endDate}${filtersList}${selectUrlPart}&search=${query}`;

        dispatch(setCurrentPage(page));

        const fetchData = async () => {
            const result = await axios(
                allFiltersUrl,
            );
            dispatch(setWorkPlanData(result.data));

            const result2 = await axios(
                quantityUrl,
            );
            dispatch(setTotalItemsCount(result2.data.eventsWorkPlanCount));
        };
        fetchData();
    }
};