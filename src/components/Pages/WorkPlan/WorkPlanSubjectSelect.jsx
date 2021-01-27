import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {
    setSelectUrlPart,
    setSelectedOption,
    changeWorkPlanFilters,
} from "../../../actions/workPlanAction";
import {setUserWidth} from '../../../actions/globalAction';
import connect from "react-redux/es/connect/connect";
import axios from "axios";


const WorkPlanSubjectSelect = (props) => {
    const {
        selectItemsUrl,
        startDateRange,
        endDateRange,
        filterType,
        selectedOption,
        userWidth,
        setSelectUrlPart,
        setSelectedOption,
        changeWorkPlanFilters,
        setUserWidth,
    } = props;

    const [selectItems, setSelectItems] = useState(null);

    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            padding: '10px 4px 10px 0',
            background: '#FFFFFF',
            border: '1px solid #E7E7E7',
            boxSizing: 'border-box',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
            borderRadius: '0px 3px 3px 3px',
            marginTop: 0
        }),
        control: (state) => ({
            alignItems: 'center',
            marginTop: 10,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            minHeight: 38,
            marginRight: 40,
            outline: '0 !important',
            position: 'relative',
            transition: 'all 100ms',
            ':hover': {
                borderBottom: '1px solid #000000',
                cursor: 'pointer',
            },
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            display: 'none',
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            padding: '0 8px 0 0',
        }),
        indicatorSeparator: (provided, state) => ({
            ...provided,
            display: 'none',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '1rem',
            color: '#000000',
            fontFamily: 'Roboto',
        }),
        option: (provided, state) => ({
            ...provided,
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: '0.87rem',
            lineHeight: '1rem',
            color: '#000000',
            padding: '5px 10px 5px 15px',
            backgroundColor: state.isDisabled
                ? null
                : state.isSelected
                    ? '#B2D4FF'
                    : state.isFocused
                        ? '#B2D4FF'
                        : null,
            ':active': {
                backgroundColor: '#DEEBFF',
            },
            ':hover': {
                backgroundColor: '#DEEBFF',
                cursor: 'pointer',
            },
        })
    }

    useEffect(() => {
        let mounted = true;
        let eventTypeListUrl = `${selectItemsUrl}?date_start=${startDateRange}&date_end=${endDateRange}`;
        if (mounted) {
            const fetchData = async () => {
                const result = await axios(
                    eventTypeListUrl,
                );
                setSelectItems(result.data);
            };
            fetchData();
        }
        return () => mounted = false;
    }, [startDateRange, endDateRange]);

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

    const handleChange = selectedOption => {
        selectedOption ? setSelectUrlPart(`&${filterType}[]=${selectedOption.id}`) : setSelectUrlPart('');
        setSelectedOption(selectedOption);
        if (userWidth > 1080) {
            changeWorkPlanFilters();
        }
    };

    return (
        <Select
            InputValue={selectedOption}
            value={selectedOption ? selectedOption : null}
            onChange={handleChange}
            options={selectItems}
            styles={customStyles}
            isClearable={true}
            tabSelectsValue={false}
            noOptionsMessage={() => 'не найдено'}
            placeholder="введите направление"
            className='react-select-container'
            classNamePrefix="react-select"/>
    );
}

WorkPlanSubjectSelect.propTypes = {
    selectItemsUrl: PropTypes.string.isRequired,
    startDateRange: PropTypes.string.isRequired,
    endDateRange: PropTypes.string.isRequired,
    filterType: PropTypes.string.isRequired,
    userWidth: PropTypes.number.isRequired,
    setSelectUrlPart: PropTypes.func.isRequired,
    setSelectedOption: PropTypes.func.isRequired,
    changeWorkPlanFilters: PropTypes.func.isRequired,
    setUserWidth: PropTypes.func.isRequired,
};

const mapStateToProps = ({workPlanReducer, globalReducer}) => ({
    selectedOption: workPlanReducer.selectedOption,
    userWidth: globalReducer.userWidth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setSelectUrlPart,
    setSelectedOption,
    changeWorkPlanFilters,
    setUserWidth,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WorkPlanSubjectSelect);