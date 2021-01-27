export const TOGGLE_SEARCH_DROPDOWN = '@@search/TOGGLE_SEARCH_DROPDOWN';

export const toggleSearchDropdown = (isOpen) => ({
    type: TOGGLE_SEARCH_DROPDOWN,
    isOpen,
});

export const SET_USER_SEARCH_QUERY = '@@search/SET_USER_SEARCH_QUERY';

export const setUserSearchQuery = (query) => ({
    type: SET_USER_SEARCH_QUERY,
    query,
});

export const SET_RADIO_SITE_FILTER = '@@search/SET_RADIO_SITE_FILTER';

export const setRadioSiteFilter = (siteFilter) => ({
    type: SET_RADIO_SITE_FILTER,
    siteFilter,
});

export const SET_RADIO_TIME_FILTER = '@@search/SET_RADIO_TIME_FILTER';

export const setRadioTimeFilter = (timeFilter) => ({
    type: SET_RADIO_TIME_FILTER,
    timeFilter,
});

export const SET_SEARCH_PAGE_URL = '@@search/SET_SEARCH_PAGE_URL';

export const setSearchPageUrl = (searchPageUrl) => ({
    type: SET_SEARCH_PAGE_URL,
    searchPageUrl,
});

export const SET_LIVE_SEARCH_URL = '@@search/SET_LIVE_SEARCH_URL';

export const setLiveSearchUrl = (liveSearchUrl) => ({
    type: SET_LIVE_SEARCH_URL,
    liveSearchUrl,
});

export const SET_SEARCH_PAGE_STRINGS_QUANTITY_URL = '@@search/SET_SEARCH_PAGE_STRINGS_QUANTITY_URL';

export const setSearchPageStringsQuantityUrl = (searchPageStringsQuantityUrl) => ({
    type: SET_SEARCH_PAGE_STRINGS_QUANTITY_URL,
    searchPageStringsQuantityUrl,
});

export const SET_SEARCH_PAGE_STRINGS_QUANTITY = '@@search/SET_SEARCH_PAGE_STRINGS_QUANTITY';

export const setSearchPageStringsQuantity = (searchPageStringsQuantity) => ({
    type: SET_SEARCH_PAGE_STRINGS_QUANTITY,
    searchPageStringsQuantity,
});

export const HIDE_SEARCH_RESULT_LIST = '@@search/HIDE_SEARCH_RESULT_LIST';

export const hideSearchResultList = (isHide) => ({
    type: HIDE_SEARCH_RESULT_LIST,
    isHide,
});

export const SET_LIVE_SEARCH_DATA = '@@search/SET_LIVE_SEARCH_DATA';

export const setLiveSearchData = (liveSearchData) => ({
    type: SET_LIVE_SEARCH_DATA,
    liveSearchData,
});

export const SET_SEARCH_DATA = '@@search/SET_SEARCH_DATA';

export const setSearchData = (searchData) => ({
    type: SET_SEARCH_DATA,
    searchData,
});

export const SET_CURRENT_PAGE = '@@search-page-paginate/SET_CURRENT_PAGE';

export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage,
});

export const SET_PAGES_QUANTITY = '@@search-page-paginate/SET_PAGES_QUANTITY';

export const setPagesQuantity = (pagesQuantity) => ({
    type: SET_PAGES_QUANTITY,
    pagesQuantity,
});

export const SET_PAGE_ITEMS_QUANTITY = '@@search-page-paginate/SET_PAGE_ITEMS_QUANTITY';

export const setPageItemsQuantity = (pageItemsQuantity) => ({
    type: SET_PAGE_ITEMS_QUANTITY,
    pageItemsQuantity,
});

export const SET_CURSOR = '@@search/SET_CURSOR';

export const setCursor = (cursor) => ({
    type: SET_CURSOR,
    cursor,
});