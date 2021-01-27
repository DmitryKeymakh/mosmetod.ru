import React from 'react';
import './_work-plan.scss';
import WorkPlanResultList from "./WorkPlanResultList";


function WorkPlanEventsBlock() {

    return (
        <div className="work-plan-events-block-wrap">
            <WorkPlanResultList/>
        </div>
    )
}

export default WorkPlanEventsBlock;