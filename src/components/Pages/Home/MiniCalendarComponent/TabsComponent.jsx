import './_tabs-component.scss'
import api from "../../../../assets/api";
import React, {Suspense, useEffect, useState} from 'react';
import {Tabs, TabList, TabPanels, TabPanel} from "@reach/tabs";
import {startOfWeek, endOfWeek, eachDayOfInterval, format} from 'date-fns';
import Preloader from "../../../Preloader/Preloader";
import CalendarTab from "./CalendarTab";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {
    setCalendarEventsQuantity,
    setInitialCalendarData,
} from "../../../../actions/homePageAction";
import connect from "react-redux/es/connect/connect";
import axios from "axios";
import {useMount} from "react-use";

const CalendarEventsList = React.lazy(() => import('./CalendarEventsList'));


const TabsComponent = (props) => {

    const {
        calendarActiveTab,
        setCalendarEventsQuantity,
        setInitialCalendarData,
    } = props;

    const [tabsQuantityList, setTabsQuantityList] = useState([
        {calendarEventsQuantity: 0},
        {calendarEventsQuantity: 0},
        {calendarEventsQuantity: 0},
        {calendarEventsQuantity: 0},
        {calendarEventsQuantity: 0},
        {calendarEventsQuantity: 0},
        {calendarEventsQuantity: 0},
    ]);

    const tabsData = eachDayOfInterval({
                start: startOfWeek(new Date(), {weekStartsOn: 1}),
                end: endOfWeek(new Date(), {weekStartsOn: 1})
            });

    const today = format(new Date(), 'd');

    const weekStart = format(startOfWeek(new Date(), {weekStartsOn: 1}), 'yyyy-MM-dd');
    const weekEnd = format(endOfWeek(new Date(), {weekStartsOn: 1}), 'yyyy-MM-dd');

    const quantityUrl = `${api.calendarEventsQuantity}?date_start=${weekStart}&date_end=${weekEnd}`

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const fetchData = async () => {
                const result = await axios(
                    quantityUrl,
                );
                setTabsQuantityList(result.data);
            };
            fetchData();
        }
        return () => mounted = false;
    }, [quantityUrl]);

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            tabsQuantityList.map((item, index) => {
                setCalendarEventsQuantity(item.calendarEventsQuantity, index);
            })
        }
        return () => mounted = false;
    }, [tabsQuantityList]);

    useMount(() => {
        tabsData.map((day, index) => {
                if (format(day, 'd') === today) {
                    const activeDate = format(tabsData[index], 'yyyy-MM-dd');
                    setInitialCalendarData(index, activeDate);
                }
            }
        );
    });

    const onChangeTab = (index) => {
        const activeDate = format(tabsData[index], 'yyyy-MM-dd');
        setInitialCalendarData(index, activeDate);
    }

    return (
        <>
            <Tabs
                className="mini-calendar-tabs"
                index={calendarActiveTab}
                onChange={onChangeTab}>
                <TabList className="mini-calendar-tabs-tablist">
                    {tabsData.map((tab, index) => (
                        <CalendarTab
                            eventsCount={tabsQuantityList[index].calendarEventsQuantity}
                            tab={tab}
                            key={index}/>))}
                </TabList>
                <TabPanels>
                    {tabsData.map((tab, index) => (
                        <TabPanel
                            key={index}>
                            <Suspense fallback={<Preloader/>}>
                                <CalendarEventsList
                                    tab={index}
                                    eventsCount={tabsQuantityList[index].calendarEventsQuantity}
                                    date={format(tab, 'yyyy-MM-dd')}
                                />
                            </Suspense>
                        </TabPanel>
                    ))}
                </TabPanels>
            </Tabs>
        </>
    )
}

TabsComponent.propTypes = {
    calendarActiveTab: PropTypes.number.isRequired,
    setCalendarEventsQuantity: PropTypes.func.isRequired,
    setInitialCalendarData: PropTypes.func.isRequired,
};

const mapStateToProps = ({homePageReducer}) => ({
    calendarActiveTab: homePageReducer.calendarActiveTab,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setCalendarEventsQuantity,
    setInitialCalendarData,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TabsComponent);