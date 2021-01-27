import update from 'immutability-helper';
import {
    SET_COURSES_DATA,
    SET_COURSES_DATA_ID,
} from '../actions/coursesAction';


const initialStore = {
    coursesData: {},
    coursesDataId: 17895,
};

export default function coursesReducer(store = initialStore, action) {
    switch (action.type) {
        case SET_COURSES_DATA: {
            return update(store, {
                coursesData: {$set: action.coursesData},
            });
        }
        case SET_COURSES_DATA_ID: {
            return update(store, {
                coursesDataId: {$set: action.coursesDataId},
            });
        }
        default:
            return store;
    }
}