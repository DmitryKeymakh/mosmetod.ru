// import api from "../assets/api";
import update from 'immutability-helper';
import {
    TOGGLE_SEARCH_DROPDOWN,
    SET_USER_SEARCH_QUERY,
    SET_RADIO_SITE_FILTER,
    SET_RADIO_TIME_FILTER,
    SET_SEARCH_PAGE_URL,
    SET_LIVE_SEARCH_URL,
    SET_SEARCH_DATA,
    SET_SEARCH_PAGE_STRINGS_QUANTITY_URL,
    SET_SEARCH_PAGE_STRINGS_QUANTITY,
    SET_PAGES_QUANTITY,
    SET_PAGE_ITEMS_QUANTITY,
    HIDE_SEARCH_RESULT_LIST,
    SET_LIVE_SEARCH_DATA,
    SET_CURRENT_PAGE,
    SET_CURSOR,
} from '../actions/searchAction';

const domain = 'http://new.mosmetod.ru';
// const domain = '';

const initialStore = {
    isOpen: false,
    query: '',
    siteFilter: 'site',
    timeFilter: 'all',
    searchPageUrl: `${domain}/api/search-page?search=&site=site&time=all&page=1&count=20`,
    searchPageStringsQuantity: 0,
    pagesQuantity: 0,
    currentPage: 0,
    searchPageStringsQuantityUrl: `${domain}/api/search-page-count?search=&site=site&time=all`,
    pageItemsQuantity: 20,
    liveSearchUrl: `${domain}/api/search?search=`,
    isHide: true,
    liveSearchData: [],
    searchData: [],
    cursor: -1,
};

export default function searchReducer(store = initialStore, action) {
    switch (action.type) {
        case TOGGLE_SEARCH_DROPDOWN: {
            return update(store, {
                isOpen: {$set: action.isOpen},
            });
        }
        case SET_USER_SEARCH_QUERY: {
            return update(store, {
                query: {$set: action.query},
            });
        }
        case SET_RADIO_SITE_FILTER: {
            return update(store, {
                siteFilter: {$set: action.siteFilter},
            });
        }
        case SET_RADIO_TIME_FILTER: {
            return update(store, {
                timeFilter: {$set: action.timeFilter},
            });
        }
        case SET_SEARCH_PAGE_URL: {
            return update(store, {
                searchPageUrl: {$set: `${domain}/api/search-page${action.searchPageUrl}`},
            });
        }
        case SET_SEARCH_PAGE_STRINGS_QUANTITY_URL: {
            return update(store, {
                searchPageStringsQuantityUrl: {$set: `${domain}/api/search-page-count${action.searchPageStringsQuantityUrl}`},
            });
        }
        case SET_SEARCH_PAGE_STRINGS_QUANTITY: {
            return update(store, {
                searchPageStringsQuantity: {$set: action.searchPageStringsQuantity},
            });
        }
        case SET_PAGES_QUANTITY: {
            return update(store, {
                pagesQuantity: {$set: action.pagesQuantity},
            });
        }
        case SET_PAGE_ITEMS_QUANTITY: {
            return update(store, {
                pageItemsQuantity: {$set: action.pageItemsQuantity},
            });
        }
        case SET_CURRENT_PAGE: {
            return update(store, {
                currentPage: {$set: action.currentPage},
            });
        }
        case SET_LIVE_SEARCH_URL: {
            return update(store, {
                liveSearchUrl: {$set: `${domain}/api${action.liveSearchUrl}`},
            });
        }
        case HIDE_SEARCH_RESULT_LIST: {
            return update(store, {
                isHide: {$set: action.isHide},
            });
        }
        case SET_LIVE_SEARCH_DATA: {
            return update(store, {
                liveSearchData: {$set: action.liveSearchData},
            });
        }
        case SET_SEARCH_DATA: {
            return update(store, {
                searchData: {$set: action.searchData},
            });
        }
        case SET_CURSOR: {
            return update(store, {
                cursor: {$set: action.cursor},
            });
        }
        default:
            return store;
    }
}