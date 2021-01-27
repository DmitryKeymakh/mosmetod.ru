import React, {useEffect, useState} from 'react';
import './_work-plan.scss';
import CheckboxTree from 'react-checkbox-tree';
import checkboxFlag from "./icons/checkbox-flag.svg";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {
    setFilterUrl,
    changeWorkPlanFilters,
    setEventTypeFilter,
    setForWhomFilter,
} from "../../../actions/workPlanAction";
import {setUserWidth,} from '../../../actions/globalAction';
import connect from "react-redux/es/connect/connect";
import axios from "axios";


export const CheckboxPanel = (props) => {
    const {
        startDateRange,
        endDateRange,
        checkListUrl,
        filterType,
        eventTypeFilters,
        forWhomFilters,
        userWidth,
        setUserWidth,
        setFilterUrl,
        changeWorkPlanFilters,
        setEventTypeFilter,
        setForWhomFilter,
    } = props;

    const [checkList, setCheckList] = useState([]);

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
        let eventTypeListUrl = `${checkListUrl}?date_start=${startDateRange}&date_end=${endDateRange}`;
        if (mounted) {
            const fetchData = async () => {
                const result = await axios(
                    eventTypeListUrl,
                );
                setCheckList(result.data);
            };
            fetchData();
        }
        return () => mounted = false;
    }, [startDateRange, endDateRange]);

    const handleCheck = (checked, targetNode) => {
        filterType === 'type_event' ? setEventTypeFilter(checked) : setForWhomFilter(checked);
        let arr = [];
        let str = `&${filterType}[]=${targetNode.label}`;
        arr.push(str);
        setFilterUrl(arr, str);
        if (userWidth > 1080) {
            changeWorkPlanFilters();
        }
    }


    return (
        <div className="filter-block-checkbox-panel-wrap">
            {
                checkList.length > 0 ?
                    <CheckboxTree
                        expandDisabled={true}
                        showNodeIcon={false}
                        nodes={checkList}
                        checked={filterType === 'type_event' ? eventTypeFilters : forWhomFilters}
                        onCheck={handleCheck}
                        icons={{
                            check: <img className="checkbox-block-img" src={checkboxFlag} alt="+"/>,
                            uncheck: ''
                        }}
                    /> :
                    <div className="work-plan-event-stats-text">Нет данных</div>
            }
        </div>
    )
}

CheckboxPanel.propTypes = {
    checkListUrl: PropTypes.string.isRequired,
    eventTypeFilters: PropTypes.array.isRequired,
    forWhomFilters: PropTypes.array.isRequired,
    startDateRange: PropTypes.string.isRequired,
    endDateRange: PropTypes.string.isRequired,
    filterType: PropTypes.string.isRequired,
    userWidth: PropTypes.number.isRequired,
    setFilterUrl: PropTypes.func.isRequired,
    setEventTypeFilter: PropTypes.func.isRequired,
    setForWhomFilter: PropTypes.func.isRequired,
    setUserWidth: PropTypes.func.isRequired,
};

const mapStateToProps = ({workPlanReducer, globalReducer}) => ({
    mobileFilterDelete: workPlanReducer.mobileFilterDelete,
    eventTypeFilters: workPlanReducer.eventTypeFilters,
    forWhomFilters: workPlanReducer.forWhomFilters,
    userWidth: globalReducer.userWidth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setFilterUrl,
    changeWorkPlanFilters,
    setEventTypeFilter,
    setForWhomFilter,
    setUserWidth,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CheckboxPanel);