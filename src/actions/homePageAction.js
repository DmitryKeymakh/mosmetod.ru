import api from "../assets/api";
import axios from "axios";

export const SET_PROJECTS_LIST = '@@home-page/SET_PROJECTS_LIST';

export const setProjectsList = (projectsList) => ({
    type: SET_PROJECTS_LIST,
    projectsList,
});


export const SET_COMPETITIONS_QUANTITY = '@@home-page/SET_COMPETITIONS_QUANTITY';

export const setCompetitionsQuantity = (competitionsQuantity) => ({
    type: SET_COMPETITIONS_QUANTITY,
    competitionsQuantity,
});

export const SET_COMPETITIONS_LIST = '@@home-page/SET_COMPETITIONS_LIST';

export const setCompetitionsList = (competitionsList) => ({
    type: SET_COMPETITIONS_LIST,
    competitionsList,
});

export const SET_COMPETITIONS_CHUNK = '@@home-page/SET_COMPETITIONS_CHUNK';

export const setCompetitionsChunk = (competitionsChunk) => ({
    type: SET_COMPETITIONS_CHUNK,
    competitionsChunk,
});

export const SET_CALENDAR_ACTIVE_TAB = '@@home-page/SET_CALENDAR_ACTIVE_TAB';

export const setCalendarActiveTab = (calendarActiveTab) => ({
    type: SET_CALENDAR_ACTIVE_TAB,
    calendarActiveTab,
});

export const SET_CALENDAR_EVENTS_QUANTITY = '@@home-page/SET_CALENDAR_EVENTS_QUANTITY';

export const setCalendarEventsQuantity = (calendarEventsQuantity, tab) => ({
    type: SET_CALENDAR_EVENTS_QUANTITY,
    calendarEventsQuantity,
    tab
});

export const SET_CALENDAR_EVENTS_LIST = '@@home-page/SET_CALENDAR_EVENTS_LIST';

export const setCalendarEventsList = (tab, calendarEventsList) => ({
    type: SET_CALENDAR_EVENTS_LIST,
    tab,
    calendarEventsList,
});

export const SET_CALENDAR_EVENTS_LIST_MORE = '@@home-page/SET_CALENDAR_EVENTS_LIST_MORE';

export const setCalendarEventsListMore = (tab, calendarEventsList) => ({
    type: SET_CALENDAR_EVENTS_LIST_MORE,
    tab,
    calendarEventsList,
});

export const SET_CALENDAR_EVENTS_CHUNK = '@@home-page/SET_CALENDAR_EVENTS_CHUNK';

export const setCalendarEventsChunk = (tab, calendarEventsChunk) => ({
    type: SET_CALENDAR_EVENTS_CHUNK,
    tab,
    calendarEventsChunk,
});

export const setInitialCalendarData = (tab, date) => {
    return (dispatch, getState) => {
        const page = 1;
        const eventsList = getState().homePageReducer.calendarTabPanels[tab].calendarEventsList;

        const eventsUrl = `${api.calendarEvents}?date=${date}&page=${page}`;

        dispatch(setCalendarActiveTab(tab));

        if (eventsList.length === 0) {
            const fetchData = async () => {
                const result = await axios(
                    eventsUrl,
                );
                dispatch(setCalendarEventsList(tab, result.data));
                dispatch(setCalendarEventsChunk(tab, page));
            };
            fetchData();
        }
    }
};

export const uploadCalendarData = (tab, date) => {
    return (dispatch, getState) => {
        const page = getState().homePageReducer.calendarTabPanels[tab].calendarEventsChunk + 1;

        const eventsUrl = `${api.calendarEvents}?date=${date}&page=${page}`;

        dispatch(setCalendarEventsChunk(tab, page));

        const fetchData = async () => {
            const result = await axios(
                eventsUrl,
            );
            dispatch(setCalendarEventsListMore(tab, result.data));
        };
        fetchData();
    }
};