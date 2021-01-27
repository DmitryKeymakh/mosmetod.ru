import './_work-plan.scss';
import React, {useEffect} from 'react';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {
    setFilterShow,
    setScrollMode,
    setInitialWorkPlanData,
    uploadWorkPlanData,
} from '../../../actions/workPlanAction';
import {setUserWidth,} from '../../../actions/globalAction';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import WorkPlanEventsItem from "./WorkPlanEventsItem";
import LinksAccordion from "../Home/MiniCalendarComponent/LinksAccordion";
import Pagination from "../../Pagination/Pagination";
import InfiniteScroll from 'react-infinite-scroll-component';
import Preloader from "../../Preloader/Preloader";
import filterOpen from "./icons/filter-open.svg";
import {useMount} from "react-use";


export const WorkPlanResultList = (props) => {

    const {
        data,
        userWidth,
        pageSize,
        currentPage,
        totalItemsCount,
        setUserWidth,
        infiniteScroll,
        setFilterShow,
        setScrollMode,
        setInitialWorkPlanData,
        uploadWorkPlanData,
    } = props;

    const pageCount = Math.ceil(totalItemsCount / pageSize);


    useMount(() => {
        setInitialWorkPlanData();
    });

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setUserWidth(document.documentElement.clientWidth);

            window.addEventListener("resize", function () {
                setUserWidth(document.documentElement.clientWidth);
            }, false);
        }
        return () => mounted = false;
    }, [setUserWidth]);

    useEffect(() => {
        let mounted = true;

        if (mounted && userWidth < 1080) {
            setScrollMode(true);
        }
        return () => mounted = false;
    }, [userWidth]);

    function loadMore() {
        uploadWorkPlanData();
    }

    return (
        <>
            <div className="work-plan-mobile-list-header">
                <img src={filterOpen} alt="настройка"
                     onClick={() => {
                         setFilterShow(true)
                     }}/>
            </div>
            {
                totalItemsCount === 0 &&
                <div className="work-plan-no-events-block">По выбранным параметрам нет запланированных
                    мероприятий</div>

            }
            {
                data.length > 0 &&
                <div className="work-plan-events-list">
                    <div className="events-load-block">
                        {
                            infiniteScroll
                                ?
                                <InfiniteScroll
                                    dataLength={data.length}
                                    next={loadMore}
                                    hasMore={totalItemsCount !== data.length}
                                    loader={<Preloader/>}
                                >
                                    <Accordion allowZeroExpanded={true}>
                                        {
                                            data.map(item => {
                                                return (
                                                    <AccordionItem key={item.id}>
                                                        <AccordionItemHeading>
                                                            <AccordionItemButton>
                                                                <WorkPlanEventsItem
                                                                    event={item}
                                                                    disable={userWidth}/>
                                                            </AccordionItemButton>
                                                        </AccordionItemHeading>
                                                        <AccordionItemPanel>
                                                            {userWidth <= 1080 &&
                                                            <LinksAccordion links={item.links}/>
                                                            }
                                                        </AccordionItemPanel>
                                                    </AccordionItem>
                                                );
                                            })}
                                    </Accordion>
                                </InfiniteScroll>
                                :
                                <Accordion allowZeroExpanded={true}>
                                    {
                                        data.map(item => {
                                            return (
                                                <AccordionItem key={item.id}>
                                                    <AccordionItemHeading>
                                                        <AccordionItemButton>
                                                            <WorkPlanEventsItem
                                                                event={item}
                                                                disable={userWidth}/>
                                                        </AccordionItemButton>
                                                    </AccordionItemHeading>
                                                    <AccordionItemPanel>
                                                        {userWidth <= 1080 &&
                                                        <LinksAccordion links={item.links}/>
                                                        }
                                                    </AccordionItemPanel>
                                                </AccordionItem>
                                            );
                                        })}
                                </Accordion>
                        }
                        {
                            totalItemsCount !== data.length && pageCount !== currentPage + 1 &&
                            <div className="see-more-container">
                                <div
                                    onClick={loadMore}
                                    className="work-plan-view-more"
                                >
                                    загрузить еще
                                </div>
                            </div>
                        }
                    </div>
                    <Pagination
                        pageCount={pageCount}
                        userWidth={userWidth}
                    />
                </div>
            }
        </>
    )
};

WorkPlanResultList.propTypes = {
    data: PropTypes.array.isRequired,
    userWidth: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalItemsCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    mobileFilterApply: PropTypes.bool.isRequired,
    setUserWidth: PropTypes.func.isRequired,
    setFilterShow: PropTypes.func.isRequired,
    setScrollMode: PropTypes.func.isRequired,
};

const mapStateToProps = ({workPlanReducer, globalReducer}) => ({
    data: workPlanReducer.data,
    totalItemsCount: workPlanReducer.totalItemsCount,
    userWidth: globalReducer.userWidth,
    pageSize: workPlanReducer.pageSize,
    currentPage: workPlanReducer.currentPage,
    infiniteScroll: workPlanReducer.infiniteScroll,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setUserWidth,
    setFilterShow,
    setScrollMode,
    setInitialWorkPlanData,
    uploadWorkPlanData,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WorkPlanResultList);