import "../NewsFeed/_news-feed.scss";
import "./_teaching-space.scss"
import React, {useEffect, useState} from 'react';
import DatePicker from "react-datepicker";
import {format} from 'date-fns';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {
    setShowDropDown,
    changeTeachingSpaceTimeFilter,
} from "../../../actions/teachingSpaceAction";
import OutsideClickHandler from "react-outside-click-handler";
import gearIcon from "../NewsFeed/icons/gear-icon.svg";


const TeachingSpaceDropFilterBlock = (props) => {
    const {
        showDropDown,
        category,
        timeFilter,
        startDateRange,
        endDateRange,
        changeTeachingSpaceTimeFilter,
        setShowDropDown,
    } = props;

    const [time, setTime] = useState(timeFilter);
    const [startDate, setStartDate] = useState(startDateRange ? new Date(startDateRange) : '');
    const [endDate, setEndDate] = useState(endDateRange ? new Date(endDateRange) : '');

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            setTime(timeFilter);
        }
        return () => mounted = false;
    }, [timeFilter]);

    const timeList = [
        {
            id: 1,
            title: 'за сутки',
            name: 'day'
        },
        {
            id: 2,
            title: 'за неделю',
            name: 'week'
        },
        {
            id: 3,
            title: 'за месяц',
            name: 'month'
        },
        {
            id: 4,
            title: 'за все время',
            name: 'all'
        }
    ];

    const toggleDropdown = () => {
        setShowDropDown(!showDropDown);
    }

    const handleTimeButton = (item) => {
        setTime(item.name);
        setStartDate('');
        setEndDate('');
    }

    const applyAll = () => {
        const startDateFilter = startDate ? format(startDate, 'yyyy-MM-dd') : '';
        const endDateFilter = endDate ? format(endDate, 'yyyy-MM-dd') : '';
        const timeFilter = startDate && endDate ? '' : time;
        setShowDropDown(false);
        changeTeachingSpaceTimeFilter(category, timeFilter, startDateFilter, endDateFilter);
    }

    return (
        <div className="teaching-space-filter-drop-wrap">
            <OutsideClickHandler
                onOutsideClick={() => {
                    setShowDropDown(false);
                }}
            >
                <div className="teaching-space-filter-drop-button" onClick={toggleDropdown}>
                    <img src={gearIcon} alt="+"/>
                </div>
                {
                    showDropDown &&
                    <div className="teaching-space-filter-drop-block">
                        <div className="news-feed-filter-drop-block-left">
                            {
                                timeList.map((item) => (
                                    <div className={item.name === time ?
                                        "news-feed-filter-drop-block-period-button-active" :
                                        "news-feed-filter-drop-block-period-button"}
                                         key={item.id}
                                         onClick={() => handleTimeButton(item)}>
                                        {item.title}
                                    </div>
                                ))}
                        </div>
                        <div className="news-feed-filter-drop-block-right">
                            <div className="news-feed-filter-drop-block-header">
                                дата/период
                            </div>
                            <div className="news-feed-filter-drop-block-period-wrap">
                                от
                                <DatePicker
                                    className="news-feed-filter-date-input"
                                    tabIndex="1"
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    dateFormat="dd.MM.yyyy"
                                    placeholderText={format(new Date(), 'dd.MM.yyyy')}
                                    calendarClassName="news-feed-filter-calendar"
                                />
                            </div>
                            <div className="news-feed-filter-drop-block-period-wrap">
                                до
                                <DatePicker
                                    className="news-feed-filter-date-input"
                                    tabIndex="1"
                                    selected={endDate}
                                    onChange={date => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    dateFormat="dd.MM.yyyy"
                                    placeholderText={format(new Date(), 'dd.MM.yyyy')}
                                    calendarClassName="news-feed-filter-calendar"
                                />
                            </div>
                            <div className="news-feed-filter-drop-block-apply-button"
                                 onClick={applyAll}>
                                Применить
                            </div>
                        </div>
                    </div>
                }
            </OutsideClickHandler>
        </div>
    );
}

TeachingSpaceDropFilterBlock.propTypes = {
    showDropDown: PropTypes.bool.isRequired,
    category: PropTypes.number.isRequired,
    timeFilter: PropTypes.string.isRequired,
    startDateRange: PropTypes.string.isRequired,
    endDateRange: PropTypes.string.isRequired,
    setShowDropDown: PropTypes.func.isRequired,
    changeTeachingSpaceTimeFilter: PropTypes.func.isRequired,
};

const mapStateToProps = ({teachingSpaceReducer}) => ({
    showDropDown: teachingSpaceReducer.showDropDown,
    timeFilter: teachingSpaceReducer.timeFilter,
    startDateRange: teachingSpaceReducer.startDateRange,
    endDateRange: teachingSpaceReducer.endDateRange,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setShowDropDown,
    changeTeachingSpaceTimeFilter,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TeachingSpaceDropFilterBlock);