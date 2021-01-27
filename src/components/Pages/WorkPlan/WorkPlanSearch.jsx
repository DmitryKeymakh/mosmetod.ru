import './_work-plan.scss';
import React, {useEffect, useState} from 'react';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {
    setWorkPlanQuery,
    changeWorkPlanFilters,
} from '../../../actions/workPlanAction';
import {setUserWidth} from '../../../actions/globalAction';
import PropTypes from "prop-types";


export const WorkPlanSearch = (props) => {

    const {
        query,
        userWidth,
        setWorkPlanQuery,
        setUserWidth,
        changeWorkPlanFilters,
    } = props;

    const changeHandler = (event) => {
        setWorkPlanQuery(event.target.value.trim());
        if (userWidth > 1080) {
            changeWorkPlanFilters();
        }
    }

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

    return (
        <div className="work-plan-search-wrap">
            <input
                className="work-plan-search-input"
                value={query}
                name="search"
                type="search"
                placeholder="введите название"
                spellCheck="false"
                //autoComplete="off"
                onChange={changeHandler}
            />
        </div>
    );
};

WorkPlanSearch.propTypes = {
    query: PropTypes.string.isRequired,
    userWidth: PropTypes.number.isRequired,
    setWorkPlanQuery: PropTypes.func.isRequired,
    changeWorkPlanFilters: PropTypes.func.isRequired,
    setUserWidth: PropTypes.func.isRequired,
};

const mapStateToProps = ({workPlanReducer, globalReducer}) => ({
    query: workPlanReducer.query,
    userWidth: globalReducer.userWidth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setWorkPlanQuery,
    changeWorkPlanFilters,
    setUserWidth,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WorkPlanSearch);