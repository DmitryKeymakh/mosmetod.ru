import React, {useState} from 'react';
import './_work-plan.scss';
import {DateRange, Calendar} from 'react-date-range';
import {add, format, sub} from 'date-fns';
import ru from 'date-fns/locale/ru';
import filterAcc from "./icons/filter-acc.svg";
import pdfIcon from "./icons/pdf-icon.png";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import Switch from "react-switch";
import CheckboxPanel from "./CheckboxPanel";
import WorkPlanSubjectSelect from "./WorkPlanSubjectSelect";
import api from "../../../assets/api";
import WorkPlanSearch from "./WorkPlanSearch";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {
    setStartDateRange,
    setEndDateRange,
    changeWorkPlanFilters,
    toggleSwitch,
} from "../../../actions/workPlanAction";
import connect from "react-redux/es/connect/connect";


const WorkPlanFilterBlock = (props) => {
    const {
        startDateRange,
        endDateRange,
        switchValue,
        setStartDateRange,
        setEndDateRange,
        changeWorkPlanFilters,
        toggleSwitch,
    } = props;

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(startDateRange),
            endDate: new Date(endDateRange),
            key: 'selection'
        }
    ]);
    const [date, setDate] = useState(new Date(startDateRange));
    const [downloadPeriod, setDownloadPeriod] = useState(new Date(startDateRange));

    const changeDownLoadPeriod = (shownDate) => {
        setDownloadPeriod(shownDate);
    }

    const rangeHandler = (item) => {
        setDateRange([item.selection]);
        setStartDateRange(format(item.selection.startDate, 'yyyy-MM-dd'));
        setEndDateRange(format(item.selection.endDate, 'yyyy-MM-dd'));
        changeWorkPlanFilters();
    }

    const dateHandler = (item) => {
        setDate(item);
        setStartDateRange(format(item, 'yyyy-MM-dd'));
        setEndDateRange(format(item, 'yyyy-MM-dd'));
        changeWorkPlanFilters();
    }

    const switchHandler = () => {
        toggleSwitch(!switchValue);
        setDate(new Date(startDateRange));
        setStartDateRange(startDateRange);
        setEndDateRange(startDateRange);
        setDateRange([
            {
                startDate: new Date(startDateRange),
                endDate: new Date(startDateRange),
                key: 'selection'
            }
        ]);
        changeWorkPlanFilters();
    }

    return (
        <div className="work-plan-filter-block-wrap">
            {
                switchValue ?
                    <DateRange
                        editableDateInputs={true}
                        onChange={rangeHandler}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                        dateDisplayFormat="dd.MM.yyyy"
                        weekdayDisplayFormat="EEEEEE"
                        locale={ru}
                        onShownDateChange={changeDownLoadPeriod}
                        startDatePlaceholder="01.01.2020"
                        endDatePlaceholder="01.01.2020"
                        minDate={sub(new Date(), {years: 5})}
                        maxDate={add(new Date(), {years: 5})}
                    />
                    :
                    <Calendar
                        onChange={dateHandler}
                        onShownDateChange={changeDownLoadPeriod}
                        locale={ru}
                        weekdayDisplayFormat="EEEEEE"
                        minDate={sub(new Date(), {years: 5})}
                        maxDate={add(new Date(), {years: 5})}
                        date={date}/>
            }
            <div className="switch-block">
                <span className="switch-text"
                onClick={() => toggleSwitch(false)}>Дата</span>
                <Switch
                    checked={switchValue}
                    onChange={switchHandler}
                    handleDiameter={10}
                    offColor="#fff"
                    onColor="#fff"
                    offHandleColor="#5C5C5C"
                    onHandleColor="#5C5C5C"
                    boxShadow="0px 1px 1px rgba(0, 0, 0, 0.25)"
                    activeBoxShadow="0px 0px 1px 3px rgba(0, 0, 0, 0.2)"
                    height={16}
                    width={32}
                    className="react-switch"
                />
                <span className="switch-text"
                      onClick={() => toggleSwitch(true)}>Период</span>
            </div>
            <div className="filter-block">
                <div className="pdf-download-wrap">
                    <a className="pdf-download-button"
                       href={`${api.workPlanPdf}?month=${format(downloadPeriod, 'M')}&year=${format(downloadPeriod, 'yyyy')}`}
                       target="_blank" rel="noopener noreferrer">
                        <img src={pdfIcon} alt="PDF"/>
                        <div>скачать</div>
                    </a>
                    <a className="pdf-download-text"
                       href={`${api.workPlanPdf}?month=${format(downloadPeriod, 'M')}&year=${format(downloadPeriod, 'yyyy')}`}
                       target="_blank" rel="noopener noreferrer">
                        план работ на
                        <div className="pdf-download-text-period">
                            {format(downloadPeriod, 'LLLL yyyy', {locale: ru}).toUpperCase()}
                        </div>
                    </a>
                </div>
                <Accordion className="filter-block-accordion"
                           allowMultipleExpanded={true}
                           allowZeroExpanded={true}
                           preExpanded={['a', 'b', 'c', 'd', 'e']}>
                    <AccordionItem uuid="a">
                        <AccordionItemHeading>
                            <AccordionItemButton className="filter-block-accordion__button">
                                <span className="filter-block-title-text">Название</span>
                                <img className="filter-block-acc-img" src={filterAcc} alt="+"/>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <WorkPlanSearch/>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem uuid="b">
                        <AccordionItemHeading>
                            <AccordionItemButton className="filter-block-accordion__button">
                                <span className="filter-block-title-text">Тип мероприятия</span>
                                <img className="filter-block-acc-img" src={filterAcc} alt="+"/>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <CheckboxPanel
                                filterType={'type_event'}
                                checkListUrl={api.workPlanEventTypeList}
                                startDateRange={startDateRange}
                                endDateRange={endDateRange}
                            />
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem uuid="c">
                        <AccordionItemHeading>
                            <AccordionItemButton className="filter-block-accordion__button">
                                <span className="filter-block-title-text">Для кого</span>
                                <img className="filter-block-acc-img" src={filterAcc} alt="+"/>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <CheckboxPanel
                                filterType={'for_whom'}
                                checkListUrl={api.workPlanForWhomList}
                                startDateRange={startDateRange}
                                endDateRange={endDateRange}
                            />
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem uuid="d">
                        <AccordionItemHeading>
                            <AccordionItemButton className="filter-block-accordion__button">
                                <span className="filter-block-title-text">Предмет/направление</span>
                                <img className="filter-block-acc-img" src={filterAcc} alt="+"/>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <WorkPlanSubjectSelect
                                filterType={'user_groups_id'}
                                selectItemsUrl={api.eventsSubjectList}
                                startDateRange={startDateRange}
                                endDateRange={endDateRange}
                            />
                        </AccordionItemPanel>
                    </AccordionItem>
                    {/*<AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton className="filter-block-accordion__button">
                                <span className="filter-block-title-text">Округ</span>
                                <img className="filter-block-acc-img" src={filterAcc} alt="+"/>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <CheckboxPanel
                                filterType={'district'}
                                checkListUrl={api.workPlanDistrictList}
                                startDateRange={startDateRange}
                                endDateRange={endDateRange}
                            />
                        </AccordionItemPanel>
                    </AccordionItem>*/}
                </Accordion>
            </div>
        </div>
    )
}

WorkPlanFilterBlock.propTypes = {
    startDateRange: PropTypes.string.isRequired,
    endDateRange: PropTypes.string.isRequired,
    switchValue: PropTypes.bool.isRequired,
    setStartDateRange: PropTypes.func.isRequired,
    setEndDateRange: PropTypes.func.isRequired,
    changeWorkPlanFilters: PropTypes.func.isRequired,
    toggleSwitch: PropTypes.func.isRequired,
};

const mapStateToProps = ({workPlanReducer}) => ({
    startDateRange: workPlanReducer.startDateRange,
    endDateRange: workPlanReducer.endDateRange,
    switchValue: workPlanReducer.switchValue,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setStartDateRange,
    setEndDateRange,
    changeWorkPlanFilters,
    toggleSwitch,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WorkPlanFilterBlock);