import update from 'immutability-helper';
import {
    SET_ACTIVE_CATEGORY_INDEX,
    SET_STAFF_DATA,
    SET_BURGER_OPEN,
    SET_PERSON_DATA,
    SET_PERSON_ID,
} from '../actions/aboutTheCenterAction';


const initialStore = {
    activeCategoryIndex: 0,
    staffData: [],
    burgerOpen: false,
    personData: {},
    personId: 0,
};

export default function aboutTheCenterReducer(store = initialStore, action) {
    switch (action.type) {
        case SET_ACTIVE_CATEGORY_INDEX: {
            return update(store, {
                activeCategoryIndex: {$set: action.categoryIndex},
            });
        }
        case SET_STAFF_DATA: {
            return update(store, {
                staffData: {$set: action.staffData},
            });
        }
        case SET_BURGER_OPEN: {
            return update(store, {
                burgerOpen: {$set: action.burgerOpen},
            });
        }
        case SET_PERSON_DATA: {
            return update(store, {
                personData: {$set: action.personData},
            });
        }
        case SET_PERSON_ID: {
            return update(store, {
                personId: {$set: action.personId},
            });
        }
        default:
            return store;
    }
}