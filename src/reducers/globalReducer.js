import update from 'immutability-helper';
import {
    SET_USER_WIDTH,
} from '../actions/globalAction';


const initialStore = {
    userWidth: document.documentElement.clientWidth,
};

export default function globalReducer(store = initialStore, action) {
    switch (action.type) {
        case SET_USER_WIDTH: {
            return update(store, {
                userWidth: {$set: action.userWidth},
            });
        }
        default:
            return store;
    }
}