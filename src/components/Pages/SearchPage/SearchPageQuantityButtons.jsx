import './_search-page.scss';
import '../../Pagination/_pagination.scss';
import React, {useState} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {
    setSearchPageUrl,
    setPagesQuantity,
    setCurrentPage,
    setPageItemsQuantity,
} from '../../../actions/searchAction';
// import infinityIcon from '../../Pagination/infinity.svg';


const SearchPageQuantityButtons = (props) => {

    const {
        query,
        siteFilter,
        timeFilter,
        searchPageStringsQuantity,
        pageItemsQuantity,
        setSearchPageUrl,
        setPagesQuantity,
        setCurrentPage,
        setPageItemsQuantity,
    } = props;

    const [activeButtonId, setActiveButtonId] = useState(0);

    const quantityButtons = [
        {quantity: 20, text: '20'},
        {quantity: 50, text: '50'},
        // {quantity: 20, text: <img src={infinityIcon} alt="все"/>},
    ];

    return (
        <div className="pagination-quantity-block">
            <h3 className="pagination-quantity-text">Показывать</h3>
            {quantityButtons.map((item, id) => (
                <Link
                    className={id === activeButtonId
                        ? 'pagination-quantity-btn active-quantity'
                        : 'pagination-quantity-btn'}
                    key={id}
                    to={`?search=${query}&site=${siteFilter}&time=${timeFilter}&page=1&count=${item.quantity}`}
                    onClick={() => {
                        setActiveButtonId(id);
                        setCurrentPage(1);
                        setPageItemsQuantity(item.quantity);
                        setSearchPageUrl(`?search=${query}&site=${siteFilter}&time=${timeFilter}&page=1&count=${item.quantity}`);
                        setPagesQuantity(searchPageStringsQuantity / item.quantity);
                        // setSearchPageUrlNew(query, siteFilter, timeFilter, currentPage, item.quantity);
                        window.scroll(0, 0);
                    }}
                >
                    {item.text}
                </Link>
            ))}
        </div>
    )
}

SearchPageQuantityButtons.propTypes = {
    query: PropTypes.string.isRequired,
    siteFilter: PropTypes.string.isRequired,
    timeFilter: PropTypes.string.isRequired,
    searchPageStringsQuantity: PropTypes.number.isRequired,
    pageItemsQuantity: PropTypes.number.isRequired,
    setSearchPageUrl: PropTypes.func.isRequired,
    setPagesQuantity: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    setPageItemsQuantity: PropTypes.func.isRequired,
};

const mapStateToProps = ({searchReducer}) => ({
    query: searchReducer.query,
    siteFilter: searchReducer.siteFilter,
    timeFilter: searchReducer.timeFilter,
    searchPageStringsQuantity: searchReducer.searchPageStringsQuantity,
    pageItemsQuantity: searchReducer.pageItemsQuantity,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setPagesQuantity,
    setCurrentPage,
    setSearchPageUrl,
    setPageItemsQuantity,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchPageQuantityButtons);