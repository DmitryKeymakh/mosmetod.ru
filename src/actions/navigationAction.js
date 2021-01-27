export const SET_MENU_ITEMS = '@@navigation/SET_MENU_ITEMS';

export const setMenuItems = (menuItemsList) => ({
    type: SET_MENU_ITEMS,
    menuItemsList,
});

export const TOGGLE_BURGER_MENU = '@@live-search/TOGGLE_BURGER_MENU';

export const toggleBurgerMenu = (isOpenBurgerMenu) => ({
    type: TOGGLE_BURGER_MENU,
    isOpenBurgerMenu,
});

export const SET_TAGS_LIST = '@@navigation/SET_TAGS_LIST';

export const setTagsList = (tagsList) => ({
    type: SET_TAGS_LIST,
    tagsList,
});