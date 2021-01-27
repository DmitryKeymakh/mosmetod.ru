import update from 'immutability-helper';
import {
    SET_START_DATE_RANGE,
    SET_END_DATE_RANGE,
    SET_MORE_TEACHING_SPACE_DATA,
    SET_TOTAL_ITEMS_COUNT,
    SET_SHOW_DROP_DOWN,
    SET_TIME_FILTER,
    SET_CURRENT_PAGE,
    SET_MATERIALS_CATEGORY,
    SET_TEACHING_SPACE_DATA,
    SET_MATERIALS_FILTERS,
    SET_TEACHING_SPACE_NAME,
    SET_TEACHING_SPACE_SUBSCRIBE_RESULT,
    SET_ERROR,
} from '../actions/teachingSpaceAction';


const initialStore = {
    data: [],
    totalItemsCount: 0,
    currentPage: 1,
    materialsCategory: 0,
    materialsFilters: [],
    showDropDown: false,
    timeFilter: 'all',
    startDateRange: '',
    endDateRange: '',
    teachingSpaceInfo: {
        id_category_parent: null,
        name_category: '',
        name_category_parent: ''
    },
    subscribeResult: '',
    isError: false,
};

export default function teachingSpaceReducer(store = initialStore, action) {
    switch (action.type) {
        case SET_TEACHING_SPACE_SUBSCRIBE_RESULT: {
            return update(store, {
                subscribeResult: {$set: action.subscribeResult},
            });
        }
        case SET_ERROR: {
            return update(store, {
                isError: {$set: action.isError},
            });
        }
        case SET_TEACHING_SPACE_NAME: {
            return update(store, {
                teachingSpaceInfo: {$set: action.teachingSpaceInfo},
            });
        }
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
        case SET_TEACHING_SPACE_DATA: {
            return update(store, {
                data: {$set: action.data},
            });
        }
        case SET_MORE_TEACHING_SPACE_DATA: {
            return update(store, {
                data: {$push: action.data},

            });
        }
        case SET_TOTAL_ITEMS_COUNT: {
            return update(store, {
                totalItemsCount: {$set: action.totalItemsCount},
            });
        }
        case SET_MATERIALS_FILTERS: {
            return update(store, {
                materialsFilters: {$set: action.materialsFilters},
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
        case SET_MATERIALS_CATEGORY: {
            return update(store, {
                materialsCategory: {$set: action.materialsCategory},
            });
        }
        default:
            return store;
    }
}