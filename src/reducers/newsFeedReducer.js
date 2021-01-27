import update from 'immutability-helper';
import {
    SET_START_DATE_RANGE,
    SET_END_DATE_RANGE,
    SET_MORE_NEWS_FEED_DATA,
    SET_TOTAL_ITEMS_COUNT,
    SET_SHOW_DROP_DOWN,
    SET_TIME_FILTER,
    SET_CURRENT_PAGE,
    SET_ACTIVE_TAB_INDEX,
    SET_NEWS_CATEGORY,
    SET_NEWS_FEED_DATA,
    SET_WEBINARS_CATEGORY,
    SET_WEBINARS_DATA,
    SET_MORE_WEBINARS_DATA,
    SET_WEBINARS_FILTERS,
} from '../actions/newsFeedAction';


const initialStore = {
    data: [],
    webinarsData: [],
    totalItemsCount: 0,
    currentPage: 1,
    activeTabIndex: 0,
    newsCategory: 'Оперативная информация',
    webinarsCategory: 0,
    webinarsFilters: [],
    showDropDown: false,
    timeFilter: 'all',
    startDateRange: '',
    endDateRange: '',
};

export default function newsFeedReducer(store = initialStore, action) {
    switch (action.type) {
        case SET_START_DATE_RANGE: {
            return update(store, {
                startDateRange: {$set: action.startDateRange},
            });
        }
        case SET_END_DATE_RANGE: {
            return update(store, {
                endDateRange: {$set: action.endDateRange},
            });
        }
        case SET_NEWS_FEED_DATA: {
            return update(store, {
                data: {$set: action.data},
            });
        }
        case SET_MORE_NEWS_FEED_DATA: {
            return update(store, {
                data: {$push: action.data},

            });
        }
        case SET_WEBINARS_DATA: {
            return update(store, {
                webinarsData: {$set: action.webinarsData},
            });
        }
        case SET_MORE_WEBINARS_DATA: {
            return update(store, {
                webinarsData: {$push: action.webinarsData},

            });
        }
        case SET_TOTAL_ITEMS_COUNT: {
            return update(store, {
                totalItemsCount: {$set: action.totalItemsCount},
            });
        }
        case SET_SHOW_DROP_DOWN: {
            return update(store, {
                showDropDown: {$set: action.showDropDown},
            });
        }
        case SET_TIME_FILTER: {
            return update(store, {
                timeFilter: {$set: action.timeFilter},
            });
        }
        case SET_CURRENT_PAGE: {
            return update(store, {
                currentPage: {$set: action.currentPage},
            });
        }
        case SET_ACTIVE_TAB_INDEX: {
            return update(store, {
                activeTabIndex: {$set: action.activeTabIndex},
            });
        }
        case SET_NEWS_CATEGORY: {
            return update(store, {
                newsCategory: {$set: action.newsCategory},
            });
        }
        case SET_WEBINARS_CATEGORY: {
            return update(store, {
                webinarsCategory: {$set: action.webinarsCategory},
            });
        }
        case SET_WEBINARS_FILTERS: {
            return update(store, {
                webinarsFilters: {$set: action.webinarsFilters},
            });
        }
        default:
            return store;
    }
}