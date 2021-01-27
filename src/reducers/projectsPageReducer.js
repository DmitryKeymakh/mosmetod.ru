import update from 'immutability-helper';
import {
    SET_PROJECTS_PAGE_DATA,
    SET_PROJECTS_PAGE_QUERY,
    SET_SHOW_ARCHIVE_DATA,
    SET_LIVE_SEARCH_DATA,
} from '../actions/projectsPageAction';


const initialStore = {
    projectsPageData: [],
    projectsPageQuery: '',
    showArchive: false,
    liveSearchData: [],
};

export default function projectsPageReducer(store = initialStore, action) {
    switch (action.type) {
        case SET_PROJECTS_PAGE_DATA: {
            return update(store, {
                projectsPageData: {$set: action.projectsPageData},
            });
        }
        case SET_PROJECTS_PAGE_QUERY: {
            return update(store, {
                projectsPageQuery: {$set: action.projectsPageQuery},
            });
        }
        case SET_SHOW_ARCHIVE_DATA: {
            return update(store, {
                showArchive: {$set: action.showArchive},
            });
        }
        case SET_LIVE_SEARCH_DATA: {
            return update(store, {
                liveSearchData: {$set: action.liveSearchData},
            });
        }
        default:
            return store;
    }
}