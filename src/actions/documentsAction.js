import axios from "axios";
import api from "../assets/api";

export const SET_MORE_DOCUMENTS_DATA = '@@documents/SET_MORE_DOCUMENTS_DATA';

export const setMoreDocumentsData = (data) => ({
    type: SET_MORE_DOCUMENTS_DATA,
    data,
});

export const SET_DOCUMENTS_DATA = '@@documents/SET_DOCUMENTS_DATA';

export const setDocumentsData = (data) => ({
    type: SET_DOCUMENTS_DATA,
    data,
});

export const SET_TOTAL_ITEMS_COUNT = '@@documents/SET_TOTAL_ITEMS_COUNT';

export const setTotalItemsCount = (totalItemsCount) => ({
    type: SET_TOTAL_ITEMS_COUNT,
    totalItemsCount,
});

export const SET_CURRENT_PAGE = '@@documents/SET_CURRENT_PAGE';

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage,
});

export const SET_DOCUMENTS_CATEGORY = '@@documents/SET_DOCUMENTS_CATEGORY';

export const setDocumentsCategory = (documentsCategory) => ({
    type: SET_DOCUMENTS_CATEGORY,
    documentsCategory,
});

export const SET_DOCUMENTS_FILTERS_LIST = '@@documents/SET_DOCUMENTS_FILTERS_LIST';

export const setDocumentsFiltersList = (documentsFiltersList) => ({
    type: SET_DOCUMENTS_FILTERS_LIST,
    documentsFiltersList,
});



export const setInitialDocumentsData = () => {
    return (dispatch, getState) => {

        const category = getState().documentsReducer.documentsCategory;
        const page = getState().documentsReducer.currentPage;

        const materialsListUrl = `${api.documentsList}?category=${category}&page=${page}`;
        const materialsListQuantityUrl = `${api.documentsQuantity}?category=${category}`;

        if (category === 0 && page === 1) {
            const fetchData = async () => {
                const result = await axios(
                    materialsListUrl,
                );
                dispatch(setDocumentsData(result.data));

                const result2 = await axios(
                    materialsListQuantityUrl,
                );
                dispatch(setTotalItemsCount(result2.data.newsPageCount));
            };
            fetchData();
        }
    }
};


export const changeDocumentsData = (category) => {
    return (dispatch) => {

        const page = 1;

        dispatch(setCurrentPage(page));
        dispatch(setDocumentsCategory(category));

        const materialsListUrl = `${api.documentsList}?category=${category}&page=${page}`;
        const materialsListQuantityUrl = `${api.documentsQuantity}?category=${category}`;

        const fetchData = async () => {
            const result = await axios(
                materialsListUrl,
            );
            dispatch(setDocumentsData(result.data));

            const result2 = await axios(
                materialsListQuantityUrl,
            );
            dispatch(setTotalItemsCount(result2.data.newsPageCount));
        };
        fetchData();
    }
};


export const uploadDocumentsData = () => {
    return (dispatch, getState) => {

        const category = getState().documentsReducer.documentsCategory;
        const page = getState().documentsReducer.currentPage + 1;

        dispatch(setCurrentPage(page));

        const materialsListUrl = `${api.documentsList}?category=${category}&page=${page}`;

        const fetchData = async () => {
            const result = await axios(
                materialsListUrl,
            );
            dispatch(setMoreDocumentsData(result.data));
        };
        fetchData();
    }
};


export const setFiltersList = () => {
    return (dispatch) => {

        const materialsListFiltersUrl = `${api.documentsFilters}`;

        const fetchData = async () => {
            const result = await axios(
                materialsListFiltersUrl,
            );
            dispatch(setDocumentsFiltersList(result.data));
        };
        fetchData();
    }
};