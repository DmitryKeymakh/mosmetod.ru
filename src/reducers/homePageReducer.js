import update from 'immutability-helper';
import {
    SET_PROJECTS_LIST,
    SET_COMPETITIONS_QUANTITY,
    SET_COMPETITIONS_LIST,
    SET_COMPETITIONS_CHUNK,
    SET_CALENDAR_ACTIVE_TAB,
    SET_CALENDAR_EVENTS_QUANTITY,
    SET_CALENDAR_EVENTS_LIST,
    SET_CALENDAR_EVENTS_CHUNK,
    SET_CALENDAR_EVENTS_LIST_MORE,
} from '../actions/homePageAction';


const initialStore = {
    projectsList: [],
    competitionsQuantity: 0,
    competitionsList: [],
    competitionsChunk: 1,
    calendarActiveTab: 0,
    calendarTabPanels: {
        0: {
            calendarEventsQuantity: 0,
            calendarEventsList: [],
            calendarEventsChunk: 1,
        },
        1: {
            calendarEventsQuantity: 0,
            calendarEventsList: [],
            calendarEventsChunk: 1,
        },
        2: {
            calendarEventsQuantity: 0,
            calendarEventsList: [],
            calendarEventsChunk: 1,
        },
        3: {
            calendarEventsQuantity: 0,
            calendarEventsList: [],
            calendarEventsChunk: 1,
        },
        4: {
            calendarEventsQuantity: 0,
            calendarEventsList: [],
            calendarEventsChunk: 1,
        },
        5: {
            calendarEventsQuantity: 0,
            calendarEventsList: [],
            calendarEventsChunk: 1,
        },
        6: {
            calendarEventsQuantity: 0,
            calendarEventsList: [],
            calendarEventsChunk: 1,
        }
    },
};

export default function homePageReducer(store = initialStore, action) {
    switch (action.type) {
        case SET_PROJECTS_LIST: {
            return update(store, {
                projectsList: {$set: action.projectsList},
            });
        }
        case SET_COMPETITIONS_QUANTITY: {
            return update(store, {
                competitionsQuantity: {$set: action.competitionsQuantity},
            });
        }
        case SET_COMPETITIONS_LIST: {
            return update(store, {
                competitionsList: {$push: action.competitionsList},

            });
        }
        case SET_COMPETITIONS_CHUNK: {
            return update(store, {
                competitionsChunk: {$set: action.competitionsChunk},
            });
        }
        case SET_CALENDAR_ACTIVE_TAB: {
            return update(store, {
                calendarActiveTab: {$set: action.calendarActiveTab},
            });
        }
        case SET_CALENDAR_EVENTS_QUANTITY: {
            return update(store, {
                calendarTabPanels: {
                    [action.tab]: {
                        calendarEventsQuantity: {$set: action.calendarEventsQuantity}
                    }
                },
            });
        }
        case SET_CALENDAR_EVENTS_LIST: {
            return update(store, {
                calendarTabPanels: {
                    [action.tab]: {
                        calendarEventsList: {$set: action.calendarEventsList}
                    }
                },
            });
        }
        case SET_CALENDAR_EVENTS_LIST_MORE: {
            return update(store, {
                calendarTabPanels: {
                    [action.tab]: {
                        calendarEventsList: {$push: action.calendarEventsList}
                    }
                },
            });
        }
        case SET_CALENDAR_EVENTS_CHUNK: {
            return update(store, {
                calendarTabPanels: {
                    [action.tab]: {
                        calendarEventsChunk: {$set: action.calendarEventsChunk}
                    }
                },
            });
        }
        default:
            return store;
    }
}