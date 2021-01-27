import './_tabs-component.scss'
import React from 'react';
import DesktopBtnBlock from "./DesktopBtnBlock";
import MobileBtnBlock from "./MobileBtnBlock";


function CalendarEventsItem(props) {

    const {period, subject, desc, links, disable} = props;

    return (
        <>
            <div className="calendar-event-block fade-in">
                <div className="calendar-event-top">
                    <div className="calendar-event-header">
                        <div className="calendar-event-period">{period.start} – {period.finish}</div>
                        <div className="calendar-event-subject">{subject}</div>
                    </div>
                    {
                        links.length > 0 &&
                        <div className="calendar-event-button-block">
                            {disable >= 1080
                                ? <DesktopBtnBlock links={links}/>
                                : <MobileBtnBlock links={links}/>
                            }
                        </div>
                    }
                </div>
                <div className="calendar-event-desc">{desc}</div>
            </div>
        </>
    );
}

export default CalendarEventsItem;