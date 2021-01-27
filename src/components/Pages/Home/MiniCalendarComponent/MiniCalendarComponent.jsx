import './_tabs-component.scss'
import React, {Suspense} from 'react';
import {startOfWeek, endOfWeek, format} from 'date-fns';
import ru from 'date-fns/locale/ru';
import TabsComponent from "./TabsComponent";
import {NavLink} from "react-router-dom";
import Preloader from "../../../Preloader/Preloader";
import MyErrorBoundary from "../../../ErrorBoundary/MyErrorBoundary";


export default class MiniCalendarComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startOfWeek: format(startOfWeek(new Date(), {weekStartsOn: 1}), 'dd'),
            endOfWeek: format(endOfWeek(new Date(), {weekStartsOn: 1}), 'dd MMMM', {locale: ru}),
            blockName: 'Календарь событий'
        };
    }


    render() {
        const {startOfWeek, endOfWeek, blockName} = this.state;

        return (
            <>
                <div className="calendar-main-wrap">
                    <NavLink to="/work-plan"  className="calendar-main-header-block">
                        <div className="calendar-main-name">{blockName}</div>
                        <div className="calendar-main-period">{startOfWeek} - {endOfWeek}</div>
                    </NavLink>
                    <MyErrorBoundary blockName={blockName}>
                        <Suspense fallback={<Preloader/>}>
                            <TabsComponent/>
                        </Suspense>
                    </MyErrorBoundary>
                </div>
            </>
        )
    }
}