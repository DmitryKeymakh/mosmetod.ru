import React from 'react';


function WorkPlanEventStat(props) {

    const {eventStat, statIcon, statName} = props;

    if (!eventStat) {
        return null;
    }

    return (
        <>
            <div className="work-plan-event-stats-item">
                <img src={statIcon} alt={statName}/>
                <div className="work-plan-event-stats-text">
                    {eventStat.start ?
                        `${eventStat.start} – ${eventStat.finish}` :
                        eventStat
                    }
                </div>
            </div>
        </>
    );
}

export default WorkPlanEventStat;