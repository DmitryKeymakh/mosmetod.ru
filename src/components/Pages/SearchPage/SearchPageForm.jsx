import './_search-page.scss';
import React from 'react';
import PropTypes from "prop-types";
// import {Link} from 'react-router-dom';
import {push} from 'connected-react-router';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {
    setUserSearchQuery,
    setRadioSiteFilter,
    setRadioTimeFilter,
    setSearchPageUrl,
    setSearchPageStringsQuantityUrl,
    setCurrentPage,
} from '../../../actions/searchAction';


const ResetButton = () => {
    return (
        <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.827473 12.377L12.8483 0.356224L13.7227 1.23059L1.70184 13.2514L0.827473 12.377Z" fill="#FF887C"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M1.72221 0.356282L13.743 12.3771L12.8687 13.2515L0.847838 1.23065L1.72221 0.356282Z" fill="#FF887C"/>
        </svg>
    )
}

export const SearchPageForm = (props) => {

    const {
        query,
        siteFilter,
        timeFilter,
        // currentPage,
        setUserSearchQuery,
        setRadioSiteFilter,
        setRadioTimeFilter,
        setSearchPageUrl,
        setSearchPageStringsQuantityUrl,
        push,
        pageItemsQuantity,
        setCurrentPage,
    } = props;

    const handleNavigate = (link) => {
        push(link);
        setSearchPageUrl(link);
        setSearchPageStringsQuantityUrl(link);
        setCurrentPage(0);
    };

    const changeHandler = (event) => {
        // setUserSearchQuery(event.target.value.trim());
        setUserSearchQuery(event.target.value);
    }

    const clickRadioSiteHandler = (value) => {
        setRadioSiteFilter(value);
    }

    const clickRadioTimeHandler = (value) => {
        setRadioTimeFilter(value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
    }

    const keyUpHandler = (event) => {
        if (event.keyCode === 13) {
            handleNavigate(`?search=${query}&site=${siteFilter}&time=${timeFilter}&page=1&count=${pageItemsQuantity}`);
            setCurrentPage(0);
        }
    };

    const resetFilterHandler = () => {
        handleNavigate(`?search=${query}&site=site&time=all&page=1&count=20`);
        setRadioSiteFilter('site');
        setRadioTimeFilter('all');
    }

    return(
        <form
            className="search-page-form"
            onSubmit={submitHandler}
        >
            <div className="input-submit-wrap">
                <input
                    className="search-page-input"
                    name="search"
                    type="search"
                    placeholder="Поиск"
                    autoComplete="off"
                    onChange={changeHandler}
                    value={query}
                    autoFocus
                    onKeyUp={(event) => {
                        keyUpHandler(event);
                    }}
                />
                {/*<Link*/}
                {/*    to={`?search=${query}&site=${siteFilter}&time=${timeFilter}&page=${currentPage}&count=${pageItemsQuantity}`}*/}
                {/*    className="search-page-submit"*/}
                {/*    type="submit"*/}
                {/*    onClick={() => handleNavigate(`?search=${query}&site=${siteFilter}&time=${timeFilter}&page=${currentPage}&count=${pageItemsQuantity}`)}*/}
                {/*>*/}
                {/*    Найти*/}
                {/*</Link>*/}
                <button
                    className="search-page-submit"
                    type="submit"
                    onClick={() => handleNavigate(`?search=${query}&site=${siteFilter}&time=${timeFilter}&page=1&count=${pageItemsQuantity}`)}
                >
                    Найти
                </button>
            </div>
            <div className="site-filter">
                <div className="radio-wrap-site">
                    <input
                        type="radio"
                        value="site"
                        className="radio-site"
                        id="site"
                        name="site-filter"
                        defaultChecked={true}
                        onClick={() => clickRadioSiteHandler('site')}
                    />
                    <label
                        className="blue-radio"
                        htmlFor="site"
                    >
                        по сайту
                    </label>
                </div>
                <div className="radio-wrap-site radio-wrap-site-margin">
                    <input
                        type="radio"
                        value="projects"
                        className="radio-site"
                        id="projects"
                        name="site-filter"
                        onClick={() => clickRadioSiteHandler('projects')}
                    />
                    <label
                        className="blue-radio"
                        htmlFor="projects"
                    >
                        по проектам
                    </label>
                </div>
                <div className="radio-wrap-site">
                    <input
                        type="radio"
                        value="title"
                        className="radio-site"
                        id="title"
                        name="site-filter"
                        onClick={() => clickRadioSiteHandler('title')}
                    />
                    <label
                        className="blue-radio"
                        htmlFor="title"
                    >
                        по заголовкам материалов
                    </label>
                </div>
            </div>
            <div className="time-filter">
                <div className="radio-wrap-projects">
                    <input
                        type="radio"
                        value="all-time"
                        className="radio-projects"
                        id="all-time"
                        name="projects-filter"
                        onClick={() => clickRadioTimeHandler('all-time')}
                        defaultChecked={true}
                    />
                    <label
                        className="grey-radio"
                        htmlFor="all-time"
                    >
                        за все время
                    </label>
                </div>
                <div className="radio-wrap-projects">
                    <input
                        type="radio"
                        value="day"
                        className="radio-projects"
                        id="day"
                        name="projects-filter"
                        onClick={() => clickRadioTimeHandler('day')}
                    />
                    <label
                        className="grey-radio"
                        htmlFor="day"
                    >
                        за сутки
                    </label>
                </div>
                <div className="radio-wrap-projects">
                    <input
                        type="radio"
                        value="week"
                        className="radio-projects"
                        id="week"
                        name="projects-filter"
                        onClick={() => clickRadioTimeHandler('week')}
                    />
                    <label
                        className="grey-radio"
                        htmlFor="week"
                    >
                        за неделю
                    </label>
                </div>
                <div className="radio-wrap-projects">
                    <input
                        type="radio"
                        value="month"
                        className="radio-projects"
                        id="month"
                        name="projects-filter"
                        onClick={() => clickRadioTimeHandler('month')}
                    />
                    <label
                        className="grey-radio"
                        htmlFor="month"
                    >
                        за месяц
                    </label>
                </div>
                <button
                    className="radio-wrap-projects"
                    onClick={() => resetFilterHandler()}
                    type="reset"
                >
                    <ResetButton />
                </button>
            </div>
        </form>
    )
};

SearchPageForm.propTypes = {
    query: PropTypes.string.isRequired,
    siteFilter: PropTypes.string.isRequired,
    timeFilter: PropTypes.string.isRequired,
    setUserSearchQuery: PropTypes.func.isRequired,
    setRadioSiteFilter: PropTypes.func.isRequired,
    setRadioTimeFilter: PropTypes.func.isRequired,
    setSearchPageStringsQuantityUrl: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
};

const mapStateToProps = ({searchReducer}) => ({
    query: searchReducer.query,
    currentPage: searchReducer.currentPage,
    siteFilter: searchReducer.siteFilter,
    timeFilter: searchReducer.timeFilter,
    pageItemsQuantity: searchReducer.pageItemsQuantity,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setUserSearchQuery,
    setRadioSiteFilter,
    setRadioTimeFilter,
    setSearchPageUrl,
    setSearchPageStringsQuantityUrl,
    setCurrentPage,
    push,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchPageForm);