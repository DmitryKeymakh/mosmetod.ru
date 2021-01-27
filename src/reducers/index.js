import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import globalReducer from "./globalReducer";
import searchReducer from './searchReducer';
import navigationReducer from "./navigationReducer";
import homePageReducer from "./homePageReducer";
import workPlanReducer from "./workPlanReducer";
import newsFeedReducer from "./newsFeedReducer";
import teachingSpaceReducer from "./teachingSpaceReducer";
import projectsPageReducer from "./projectsPageReducer";
import aboutTheCenterReducer from "./aboutTheCenterReducer";
import documentsReducer from "./documentsReducer";
import coursesReducer from "./coursesReducer";
import redactorReducer from './redactorReducer';


export default (history) => combineReducers({
    router: connectRouter(history),
    globalReducer,
    searchReducer,
    navigationReducer,
    homePageReducer,
    workPlanReducer,
    newsFeedReducer,
    teachingSpaceReducer,
    projectsPageReducer,
    aboutTheCenterReducer,
    documentsReducer,
    coursesReducer,
    redactorReducer,
});