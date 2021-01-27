import './_search-page.scss';
import '../../Pagination/_pagination.scss';
import ReactPaginate from 'react-paginate';
import React from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {
    setPagesQuantity,
    setCurrentPage,
    setSearchPageUrl,
} from '../../../actions/searchAction';


const SearchPagePaginate = (props) => {

    const {
        searchPageStringsQuantity,
        pagesQuantity,
        currentPage,
        siteFilter,
        timeFilter,
        query,
        pageItemsQuantity,
        setPagesQuantity,
        setCurrentPage,
        setSearchPageUrl,
        userWidth,
    } = props;

    const pageClickHandler = page => {
        setPagesQuantity(searchPageStringsQuantity / pageItemsQuantity);
        setCurrentPage(page.selected);
        setSearchPageUrl(`?search=${query}&site=${siteFilter}&time=${timeFilter}&page=${page.selected + 1}&count=${pageItemsQuantity}`);
        // setLoadPageMode(true);
        window.scroll(0, 0);
    }

    return (
        <div className="pagination-pages-block">
            <ReactPaginate
                previousLabel={userWidth >= 580 ? 'назад' : ''}
                nextLabel={userWidth >= 580 ? 'вперед' : ''}
                breakLabel={userWidth >= 580 ? '...' : '.'}
                breakClassName={'break-me'}
                forcePage={currentPage}
                pageCount={pagesQuantity}
                onPageChange={pageClickHandler}
                marginPagesDisplayed={1}
                pageRangeDisplayed={userWidth >= 580 ? 4 : 0}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        </div>
    )
}

SearchPagePaginate.propTypes = {
    searchPageStringsQuantity: PropTypes.number.isRequired,
    pagesQuantity: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    siteFilter: PropTypes.string.isRequired,
    timeFilter: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired,
    pageItemsQuantity: PropTypes.number.isRequired,
    setPagesQuantity: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
};

const mapStateToProps = ({searchReducer, globalReducer}) => ({
    searchPageStringsQuantity: searchReducer.searchPageStringsQuantity,
    pagesQuantity: searchReducer.pagesQuantity,
    currentPage: searchReducer.currentPage,
    siteFilter: searchReducer.siteFilter,
    timeFilter: searchReducer.timeFilter,
    query: searchReducer.query,
    pageItemsQuantity: searchReducer.pageItemsQuantity,
    userWidth: globalReducer.userWidth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setPagesQuantity,
    setCurrentPage,
    setSearchPageUrl,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchPagePaginate);