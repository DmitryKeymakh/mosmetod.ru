import './_tabs-component.scss'
import React, {useEffect} from 'react';
import CalendarEventsItem from "./CalendarEventsItem";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {uploadCalendarData} from "../../../../actions/homePageAction";
import {setUserWidth} from '../../../../actions/globalAction';
import connect from "react-redux/es/connect/connect";
import LinksAccordion from "./LinksAccordion";


export const CalendarEventsList = (props) => {

    const {
        date,
        tab,
        eventsCount,
        calendarTabPanels,
        userWidth,
        setUserWidth,
        uploadCalendarData,
    } = props;

    useEffect(() => {
        setUserWidth(document.documentElement.clientWidth);

        window.addEventListener("resize", function () {
            setUserWidth(document.documentElement.clientWidth);
        }, false);
    }, [setUserWidth]);

    const loadMore = () => {
        uploadCalendarData(tab, date);
    };


    return (
        <div className="calendar-events-list">
            {
                calendarTabPanels[tab].calendarEventsQuantity < 1
                    ?
                    <div className="calendar-events-list-no-events-block">
                        На выбранную дату нет запланированных мероприятий
                    </div>
                    :
                    <Accordion allowZeroExpanded={true}>
                        {calendarTabPanels[tab].calendarEventsList.map(item => {
                            return (
                                <AccordionItem key={item.id}>
                                    <AccordionItemHeading>
                                        <AccordionItemButton>
                                            <CalendarEventsItem
                                                period={item.period}
                                                subject={item.subject}
                                                desc={item.desc}
                                                disable={userWidth}
                                                links={item.links}/>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        {userWidth <= 1080 && item.links.length > 0 &&
                                        <LinksAccordion links={item.links}/>}
                                    </AccordionItemPanel>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
            }
            {
                calendarTabPanels[tab].calendarEventsList.length !== eventsCount && calendarTabPanels[tab].calendarEventsList.length !== 0 &&
                <div className="see-more-container">
                    <div
                        onClick={loadMore}
                        className="calendar-main-view-more"
                    >
                        смотреть еще
                    </div>
                </div>
            }
        </div>
    );
}

CalendarEventsList.propTypes = {
    calendarTabPanels: PropTypes.object.isRequired,
    userWidth: PropTypes.number.isRequired,
    setUserWidth: PropTypes.func.isRequired,
    uploadCalendarData: PropTypes.func.isRequired,
};

const mapStateToProps = ({homePageReducer, globalReducer}) => ({
    calendarTabPanels: homePageReducer.calendarTabPanels,
    userWidth: globalReducer.userWidth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setUserWidth,
    uploadCalendarData,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CalendarEventsList);