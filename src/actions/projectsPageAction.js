export const SET_PROJECTS_PAGE_DATA = '@@projects/SET_PROJECTS_PAGE_DATA';

export const setProjectsPageData = (projectsPageData) => ({
    type: SET_PROJECTS_PAGE_DATA,
    projectsPageData,
});

export const SET_PROJECTS_PAGE_QUERY = '@@projects/SET_PROJECTS_PAGE_QUERY';

export const setProjectsPageQuery = (projectsPageQuery) => ({
    type: SET_PROJECTS_PAGE_QUERY,
    projectsPageQuery,
});

export const SET_SHOW_ARCHIVE_DATA = '@@projects/SET_SHOW_ARCHIVE_DATA';

export const setArchiveDataStatus = (showArchive) => ({
    type: SET_SHOW_ARCHIVE_DATA,
    showArchive,
});

export const SET_LIVE_SEARCH_DATA = '@@projects/SET_LIVE_SEARCH_DATA';

export const setLiveSearchData = (liveSearchData) => ({
    type: SET_LIVE_SEARCH_DATA,
    liveSearchData,
});