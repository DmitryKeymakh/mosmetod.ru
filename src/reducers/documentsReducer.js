import update from 'immutability-helper';
import {
    SET_TOTAL_ITEMS_COUNT,
    SET_CURRENT_PAGE,
    SET_MORE_DOCUMENTS_DATA,
    SET_DOCUMENTS_DATA,
    SET_DOCUMENTS_CATEGORY,
    SET_DOCUMENTS_FILTERS_LIST,
} from '../actions/documentsAction';


const initialStore = {
    data: [],
    documentsFiltersList: [],
    totalItemsCount: 0,
    currentPage: 1,
    documentsCategory: 0,
};

export default function documentsReducer(store = initialStore, action) {
    switch (action.type) {
        case SET_DOCUMENTS_DATA: {
            return update(store, {
                data: {$set: action.data},
            });
        }
        case SET_MORE_DOCUMENTS_DATA: {
            return update(store, {
                data: {$push: action.data},

            });
        }
        case SET_TOTAL_ITEMS_COUNT: {
            return update(store, {
                totalItemsCount: {$set: action.totalItemsCount},
            });
        }
        case SET_CURRENT_PAGE: {
            return update(store, {
                currentPage: {$set: action.currentPage},
            });
        }
        case SET_DOCUMENTS_CATEGORY: {
            return update(store, {
                documentsCategory: {$set: action.documentsCategory},
            });
        }
        case SET_DOCUMENTS_FILTERS_LIST: {
            return update(store, {
                documentsFiltersList: {$set: action.documentsFiltersList},
            });
        }
        default:
            return store;
    }
}