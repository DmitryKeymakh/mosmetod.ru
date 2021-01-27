import './_tabs-component.scss'
import React from 'react';
import {format} from "date-fns";
import ru from "date-fns/locale/ru";
import { Tab } from "@reach/tabs";


function CalendarTab(props) {

    const {tab, eventsCount} = props;

    return (
        <Tab
            className="mini-calendar-tabs-tab"
            as="div"
            disabled={eventsCount === 0}>
            <div className="week-day">{format(tab, 'EEEEEE', {locale: ru})}</div>
            <div className="month-day">
                {format(tab, 'd')}
                <div className="mini-calendar-tabs-indicator" />
            </div>
            <div className="events-count">{eventsCount}</div>
        </Tab>
    );
}

export default CalendarTab;