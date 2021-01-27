import './_search-page.scss';
import '../../Pagination/_pagination.scss';
import emptyLogo from './empty.svg';
// import Preloader from "../../Preloader/Preloader";
import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
// import MyErrorBoundary from "../../ErrorBoundary/MyErrorBoundary";
import {push} from 'connected-react-router';
import SearchPageForm from "./SearchPageForm";
import SearchPagePaginate from "./SearchPagePaginate";
// import SearchPageQuantityButtons from "./SearchPageQuantityButtons";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {
    setSearchData,
    setSearchPageStringsQuantity,
    setPagesQuantity,
    setCurrentPage,
    setSearchPageStringsQuantityUrl,
    setSearchPageUrl,
    setPageItemsQuantity,
    // setSearchPageUrlNew,
    toggleSearchDropdown,
} from '../../../actions/searchAction';
import {Link} from "react-router-dom";


const SearchPage = (props) => {

    const {
        searchData,
        setSearchData,
        searchPageUrl,
        // searchPageStringsQuantity,
        setSearchPageStringsQuantity,
        searchPageStringsQuantityUrl,
        setPagesQuantity,
        pagesQuantity,
        // setCurrentPage,
        currentPage,
        // setSearchPageUrl,
        // timeFilter,
        // siteFilter,
        // query,
        pageItemsQuantity,
        // setPageItemsQuantity,
        // push,
        // setSearchPageUrlNew,
        // searchPageUrlNew,
        toggleSearchDropdown,
    } = props;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                searchPageUrl,
            );
            setSearchData(result.data);
        };
        fetchData();
    }, [searchPageUrl]);

    useEffect(() => {
        const fetchQuantity = async () => {
            const result = await axios(
                searchPageStringsQuantityUrl,
            );
            setSearchPageStringsQuantity(result.data.searchPageCount);
            setPagesQuantity(result.data.searchPageCount / pageItemsQuantity)
        };
        fetchQuantity();
    }, [searchPageStringsQuantityUrl, currentPage]);

    // const loadMore = () => {
    //     setCurrentPage(currentPage + 1);
    //     setSearchPageUrl(`?search=${query}&site=${siteFilter}&time=${timeFilter}&page=${currentPage + 1}&count=${pageItemsQuantity}`);
    // }

    const Project = (props) => {

        const {data} = props;

        return (
            <>
                <div className="search-header-wrap">
                    <a
                        className="search-page-result-link"
                        href={data.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => toggleSearchDropdown(false)}
                    >
                        {data.logo && <img
                            className="search-page-result-logo"
                            src={data.logo}
                            alt="logo"
                        />}
                    </a>
                    <div className="search-link-wrap">
                        <a
                            className="search-page-result-link"
                            href={data.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => toggleSearchDropdown(false)}
                        >
                            <p className="search-page-result-title">
                                {data.title}
                            </p>
                        </a>
                        <div className="search-date-description-wrap">
                            {data.description && <p className="search-page-result-description">
                                {data.description}
                            </p>}
                            {data.date && <p className="search-page-result-date">
                                {data.date}
                            </p>}
                        </div>
                    </div>
                </div>
                {data.text && <p className="search-page-result-text">
                {data.text}
            </p>}
            </>
        )
    }

    const Material = (props) => {

        const {data} = props;

        return (
            <>
                <div className="search-header-wrap">
                    <div className="search-link-wrap">
                        <Link
                            className="search-page-result-link"
                            to={`/documents/${data.id}`}
                            onClick={() => toggleSearchDropdown(false)}
                        >
                            <p className="search-page-result-title">
                                {data.title}
                            </p>
                        </Link>
                        <div className="search-date-description-wrap">
                            {data.description && <p className="search-page-result-description">
                                {data.description}
                            </p>}
                            {data.date && <p className="search-page-result-date">
                                {data.date}
                            </p>}
                        </div>
                    </div>
                </div>
                {data.text && <p className="search-page-result-text">
                {data.text}
            </p>}
            </>
        )
    }

    return(
        <div className="search-page-main">
            <SearchPageForm />
            <ul className="search-page-result">
                {searchData.map((item, id) =>
                    <li
                        key={id}
                        className="search-page-result-item"
                    >
                        {
                            item.id
                            ?
                            <Material data={item} />
                            :
                            <Project data={item} />
                        }
                    </li>
                )}
            </ul>
            {searchData.length === 0 && <div className="search-page-empty">
                <div
                    className="search-page-result-item"
                >
                    <div className="search-header-wrap">
                        <img
                            className="search-page-result-logo"
                            src={emptyLogo}
                            alt="empty-logo"
                        />
                        <p className="search-page-result-title">
                            По вашему запросу ничего не найдено
                        </p>
                    </div>
                    <p className="search-page-result-text">
                        Проверьте написание
                    </p>
                    <p className="search-page-result-text">
                        Укоротите запрос или используйте другие ключевые слова
                    </p>
                    <p className="search-page-result-text">
                        Измените настройки фильтрации
                    </p>
                </div>
            </div>}
            {/*<div className="see-more-container">*/}
            {/*    <button*/}
            {/*    onClick={loadMore}*/}
            {/*    type="button"*/}
            {/*    className="work-plan-view-more"*/}
            {/*    >*/}
            {/*        загрузить еще*/}
            {/*    </button>*/}
            {/*</div>*/}
            <div className="pagination-wrap pagination-wrap-margin">
                {searchData.length !== 0 && pagesQuantity > 1 &&
                    <>
                        <SearchPagePaginate />
                        {/*<SearchPageQuantityButtons />*/}
                    </>
                }
            </div>
        </div>
    )
}

SearchPage.propTypes = {
    searchData: PropTypes.array.isRequired,
    setSearchPageStringsQuantity: PropTypes.func.isRequired,
    searchPageStringsQuantity: PropTypes.number.isRequired,
    searchPageStringsQuantityUrl: PropTypes.string.isRequired,
    pagesQuantity: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    searchPageUrl: PropTypes.string.isRequired,
    setSearchData: PropTypes.func.isRequired,
    setPagesQuantity: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    setPageItemsQuantity: PropTypes.func.isRequired,
    toggleSearchDropdown: PropTypes.func.isRequired,
};

const mapStateToProps = ({searchReducer}) => ({
    searchData: searchReducer.searchData,
    searchPageUrl: searchReducer.searchPageUrl,
    searchPageStringsQuantity: searchReducer.searchPageStringsQuantity,
    searchPageStringsQuantityUrl: searchReducer.searchPageStringsQuantityUrl,
    pagesQuantity: searchReducer.pagesQuantity,
    currentPage: searchReducer.currentPage,
    query: searchReducer.query,
    siteFilter: searchReducer.siteFilter,
    timeFilter: searchReducer.timeFilter,
    pageItemsQuantity: searchReducer.pageItemsQuantity,
    searchPageUrlNew: searchReducer.searchPageUrlNew,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setSearchData,
    setSearchPageStringsQuantity,
    setPagesQuantity,
    setCurrentPage,
    setSearchPageStringsQuantityUrl,
    setSearchPageUrl,
    setPageItemsQuantity,
    push,
    // setSearchPageUrlNew,
    toggleSearchDropdown,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchPage);