import update from 'immutability-helper';
import {
    SET_MENU_ITEMS,
    SET_TAGS_LIST,
    TOGGLE_BURGER_MENU,
} from '../actions/navigationAction';


const initialStore = {
    menuItemsList: [],
    tagsList: [],
    isOpenBurgerMenu: false,
};

export default function navigationReducer(store = initialStore, action) {
    switch (action.type) {
        case SET_MENU_ITEMS: {
            return update(store, {
                menuItemsList: {$set: action.menuItemsList},
            });
        }
        case SET_TAGS_LIST: {
            return update(store, {
                tagsList: {$set: action.tagsList},
            });
        }
        case TOGGLE_BURGER_MENU: {
            return update(store, {
                isOpenBurgerMenu: {$set: action.isOpenBurgerMenu},
            });
        }
        default:
            return store;
    }
}