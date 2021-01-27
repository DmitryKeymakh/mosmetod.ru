import React from 'react';
import DesktopBtnBlock from "../Home/MiniCalendarComponent/DesktopBtnBlock";
import MobileBtnBlock from "../Home/MiniCalendarComponent/MobileBtnBlock";
import eventPeriod from "./icons/event-period.svg";
import eventTime from "./icons/event-time.svg";
import eventDistrict from "./icons/event-district.svg";
import eventPlace from "./icons/event-place.svg";
import eventAdmin from "./icons/event-admin.svg";
import WorkPlanEventStat from "./WorkPlanEventStat";


function WorkPlanEventsItem(props) {

    const {event, disable} = props;

    return (
        <>
            <div className="work-plan-event-block fade-in">
                <div className="work-plan-event-top">
                    <div className="work-plan-event-desc">{event.desc}</div>
                    <div className="calendar-event-button-block">
                        {disable > 1080
                            ? <DesktopBtnBlock links={event.links}/>
                            : <MobileBtnBlock links={event.links}/>
                        }
                    </div>
                </div>
                <div className="work-plan-event-stats">
                    <WorkPlanEventStat
                        eventStat={event.period}
                        statIcon={eventPeriod}
                        statName="период"/>
                    <WorkPlanEventStat
                        eventStat={event.time}
                        statIcon={eventTime}
                        statName="время"/>
                    <WorkPlanEventStat
                        eventStat={event.district}
                        statIcon={eventDistrict}
                        statName="округ"/>
                    <WorkPlanEventStat
                        eventStat={event.place}
                        statIcon={eventPlace}
                        statName="место"/>
                    <WorkPlanEventStat
                        eventStat={event.admin}
                        statIcon={eventAdmin}
                        statName="ответственный"/>
                </div>
            </div>
        </>
    );
}

export default WorkPlanEventsItem;