import api from "../assets/api";
import axios from "axios";

export const SET_NEWS_FEED_DATA = '@@news-feed/SET_NEWS_FEED_DATA';

export const setNewsFeedData = (data) => ({
    type: SET_NEWS_FEED_DATA,
    data,
});

export const SET_MORE_NEWS_FEED_DATA = '@@news-feed/SET_MORE_NEWS_FEED_DATA';

export const setMoreNewsFeedData = (data) => ({
    type: SET_MORE_NEWS_FEED_DATA,
    data,
});

export const SET_WEBINARS_DATA = '@@news-feed/SET_WEBINARS_DATA';

export const setWebinarsData = (webinarsData) => ({
    type: SET_WEBINARS_DATA,
    webinarsData,
});

export const SET_MORE_WEBINARS_DATA = '@@news-feed/SET_MORE_WEBINARS_DATA';

export const setMoreWebinarsData = (webinarsData) => ({
    type: SET_MORE_WEBINARS_DATA,
    webinarsData,
});

export const SET_TOTAL_ITEMS_COUNT = '@@news-feed/SET_TOTAL_ITEMS_COUNT';

export const setTotalItemsCount = (totalItemsCount) => ({
    type: SET_TOTAL_ITEMS_COUNT,
    totalItemsCount,
});

export const SET_START_DATE_RANGE = '@@news-feed/SET_START_DATE_RANGE';

export const setStartDateRange = (startDateRange) => ({
    type: SET_START_DATE_RANGE,
    startDateRange,
});

export const SET_END_DATE_RANGE = '@@news-feed/SET_END_DATE_RANGE';

export const setEndDateRange = (endDateRange) => ({
    type: SET_END_DATE_RANGE,
    endDateRange,
});

export const SET_SHOW_DROP_DOWN = '@@news-feed/SET_SHOW_DROP_DOWN';

export const setShowDropDown = (showDropDown) => ({
    type: SET_SHOW_DROP_DOWN,
    showDropDown,
});

export const SET_TIME_FILTER = '@@news-feed/SET_TIME_FILTER';

export const setTimeFilter = (timeFilter) => ({
    type: SET_TIME_FILTER,
    timeFilter,
});

export const SET_CURRENT_PAGE = '@@news-feed/SET_CURRENT_PAGE';

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage,
});

export const SET_ACTIVE_TAB_INDEX = '@@news-feed/SET_ACTIVE_TAB_INDEX';

export const setActiveTabIndex = (activeTabIndex) => ({
    type: SET_ACTIVE_TAB_INDEX,
    activeTabIndex,
});

export const SET_NEWS_CATEGORY = '@@news-feed/SET_NEWS_CATEGORY';

export const setNewsCategory = (newsCategory) => ({
    type: SET_NEWS_CATEGORY,
    newsCategory,
});

export const SET_WEBINARS_CATEGORY = '@@news-feed/SET_WEBINARS_CATEGORY';

export const setWebinarsCategory = (webinarsCategory) => ({
    type: SET_WEBINARS_CATEGORY,
    webinarsCategory,
});

export const SET_WEBINARS_FILTERS = '@@news-feed/SET_WEBINARS_FILTERS';

export const setWebinarsFilters = (webinarsFilters) => ({
    type: SET_WEBINARS_FILTERS,
    webinarsFilters,
});


export const setInitialNewsFeedData = () => {
    return (dispatch, getState) => {

        const category = getState().newsFeedReducer.newsCategory;
        const page = getState().newsFeedReducer.currentPage;
        const time = getState().newsFeedReducer.timeFilter;

        const allFiltersUrl = `${api.newsListByCategory}?category=${category}&time=${time}&page=${page}`;
        const totalCountUrl = `${api.newsListQuantity}?category=${category}&time=${time}`;
        const webinarsListFiltersUrl = `${api.newsFeedWebinarsFilters}`;

        if (category === 'Оперативная информация' && time === 'all' && page === 1) {
            const fetchData = async () => {
                const result = await axios(
                    allFiltersUrl,
                );
                dispatch(setNewsFeedData(result.data));

                const result2 = await axios(
                    totalCountUrl,
                );
                dispatch(setTotalItemsCount(result2.data.newsPageCount));

                const result3 = await axios(
                    webinarsListFiltersUrl,
                );
                dispatch(setWebinarsFilters(result3.data));
            };
            fetchData();
        }
    }
};

export const uploadNewsFeedData = () => {
    return (dispatch, getState) => {

        const category = getState().newsFeedReducer.newsCategory;
        const page = getState().newsFeedReducer.currentPage + 1;
        const time = getState().newsFeedReducer.timeFilter;
        const startDate = getState().newsFeedReducer.startDateRange;
        const endDate = getState().newsFeedReducer.endDateRange;

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

        const allFiltersUrl = `${api.newsListByCategory}?category=${category}${handleTime()}${handleStartDate()}${handleEndDate()}&page=${page}`;

        const fetchData = async () => {
            const result = await axios(
                allFiltersUrl,
            );
            dispatch(setMoreNewsFeedData(result.data));
        };
        fetchData();
    }
};

export const changeNewsFeedTab = (category) => {
    return (dispatch, getState) => {

        const page = 1;
        const time = getState().newsFeedReducer.timeFilter;
        const startDate = getState().newsFeedReducer.startDateRange;
        const endDate = getState().newsFeedReducer.endDateRange;
        const webinarsCategory = getState().newsFeedReducer.webinarsCategory;

        dispatch(setCurrentPage(page));
        dispatch(setNewsCategory(category));

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

        const allFiltersUrl = `${api.newsListByCategory}?category=${category}${handleTime()}${handleStartDate()}${handleEndDate()}&page=${page}`;
        const totalCountUrl = `${api.newsListQuantity}?category=${category}${handleStartDate()}${handleEndDate()}${handleTime()}`;

        const webinarsListUrl = `${api.newsFeedWebinarsList}?category=${webinarsCategory}${handleStartDate()}${handleEndDate()}${handleTime()}&page=${page}`;
        const webinarsListQuantityUrl = `${api.newsFeedWebinarsQuantity}?category=${webinarsCategory}${handleStartDate()}${handleEndDate()}${handleTime()}`;

        const fetchData = async () => {
            if (category !== 'Вебинары') {
                const result = await axios(
                    allFiltersUrl,
                );
                dispatch(setNewsFeedData(result.data));

                const result2 = await axios(
                    totalCountUrl,
                );
                dispatch(setTotalItemsCount(result2.data.newsPageCount));
            } else {
                const result3 = await axios(
                    webinarsListUrl,
                );
                dispatch(setWebinarsData(result3.data));

                const result4 = await axios(
                    webinarsListQuantityUrl,
                );
                dispatch(setTotalItemsCount(result4.data.webinarsPageCount));
            }
        }
        fetchData();
    }
};

export const changeNewsFeedTimeFilter = (time, startDate, endDate) => {
    return (dispatch, getState) => {

        const page = 1;
        const category = getState().newsFeedReducer.newsCategory;
        const webinarsCategory = getState().newsFeedReducer.webinarsCategory;

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

        const allFiltersUrl = `${api.newsListByCategory}?category=${category}${handleTime()}${handleStartDate()}${handleEndDate()}&page=${page}`;
        const totalCountUrl = `${api.newsListQuantity}?category=${category}${handleStartDate()}${handleEndDate()}${handleTime()}`;
        const webinarsListUrl = `${api.newsFeedWebinarsList}?category=${webinarsCategory}${handleStartDate()}${handleEndDate()}${handleTime()}&page=${page}`;
        const webinarsListQuantityUrl = `${api.newsFeedWebinarsQuantity}?category=${webinarsCategory}${handleStartDate()}${handleEndDate()}${handleTime()}`;

        const fetchData = async () => {
            const result = await axios(
                allFiltersUrl,
            );
            dispatch(setNewsFeedData(result.data));

            const result2 = await axios(
                totalCountUrl,
            );
            dispatch(setTotalItemsCount(result2.data.newsPageCount));

            const result3 = await axios(
                webinarsListUrl,
            );
            dispatch(setWebinarsData(result3.data));

            const result4 = await axios(
                webinarsListQuantityUrl,
            );
            dispatch(setTotalItemsCount(result4.data.webinarsPageCount));
        };
        fetchData();
    }
};

export const uploadWebinarsData = () => {
    return (dispatch, getState) => {

        const webinarsCategory = getState().newsFeedReducer.webinarsCategory;
        const page = getState().newsFeedReducer.currentPage + 1;
        const time = getState().newsFeedReducer.timeFilter;
        const startDate = getState().newsFeedReducer.startDateRange;
        const endDate = getState().newsFeedReducer.endDateRange;

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

        const webinarsListUrl = `${api.newsFeedWebinarsList}?category=${webinarsCategory}${handleStartDate()}${handleEndDate()}${handleTime()}&page=${page}`;

        const fetchData = async () => {
            const result = await axios(
                webinarsListUrl,
            );
            dispatch(setMoreWebinarsData(result.data));
        };
        fetchData();
    }
};

export const changeWebinarsFilter = (webinarsCategory) => {
    return (dispatch, getState) => {

        const page = 1;
        const time = getState().newsFeedReducer.timeFilter;
        const startDate = getState().newsFeedReducer.startDateRange;
        const endDate = getState().newsFeedReducer.endDateRange;

        dispatch(setCurrentPage(page));
        dispatch(setWebinarsCategory(webinarsCategory));

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

        const webinarsListUrl = `${api.newsFeedWebinarsList}?category=${webinarsCategory}${handleStartDate()}${handleEndDate()}${handleTime()}&page=${page}`;
        const webinarsListQuantityUrl = `${api.newsFeedWebinarsQuantity}?category=${webinarsCategory}${handleStartDate()}${handleEndDate()}${handleTime()}`;

        const fetchData = async () => {
            const result = await axios(
                webinarsListUrl,
            );
            dispatch(setWebinarsData(result.data));

            const result2 = await axios(
                webinarsListQuantityUrl,
            );
            dispatch(setTotalItemsCount(result2.data.webinarsPageCount));
        };
        fetchData();
    }
};