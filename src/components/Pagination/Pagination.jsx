import './_pagination.scss';
import React, {useState} from 'react';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {
    setPageSize,
    setScrollMode,
    changeWorkPlanFilters,
    setWorkPlanCurrentPage,
} from '../../actions/workPlanAction';
import ReactPaginate from 'react-paginate';
import infinityIcon from './infinity.svg';


export const Pagination = (props) => {

    const {
        pageCount,
        currentPage,
        infiniteScroll,
        userWidth,
        totalItemsCount,
        setPageSize,
        setScrollMode,
        changeWorkPlanFilters,
        setWorkPlanCurrentPage,
    } = props;

    const [activeButtonId, setActiveButtonId] = useState(1);
    const minQuantity = 20;

    const quantityButtons = [
        {id: 1, quantity: 20, infinite: false, text: '20'},
        {id: 2, quantity: 50, infinite: false, text: '50'},
        {id: 3, quantity: 20, infinite: true, text: <img src={infinityIcon} alt="все"/>}
    ];

    const handlePageClick = page => {
        window.scroll(0, 0);
        setWorkPlanCurrentPage(page.selected);
    }

    const handlePageSize = (item) => {
        if (item.infinite) {
            window.scroll(0, 0);
        }
        setActiveButtonId(item.id);
        setScrollMode(item.infinite);
        setPageSize(item.quantity);
        changeWorkPlanFilters();
    }

    return (
        <div className="pagination-wrap">
            <div className="pagination-pages-block">
                {
                    !infiniteScroll && pageCount > 1 &&
                    <ReactPaginate
                        previousLabel={'назад'}
                        nextLabel={'вперед'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        forcePage={currentPage}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                }
            </div>
            {
                userWidth > 1080 && totalItemsCount > minQuantity &&
                <div className="pagination-quantity-block">
                    <div className="pagination-quantity-text">Показывать</div>
                    {
                        quantityButtons.map(item => (
                            <div className={item.id === activeButtonId
                                ? 'pagination-quantity-button active-quantity'
                                : 'pagination-quantity-button'}
                                 key={item.id}
                                 onClick={() => {
                                     handlePageSize(item)
                                 }}
                            >{item.text}</div>
                        ))
                    }
                </div>
            }
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    infiniteScroll: PropTypes.bool.isRequired,
    setPageSize: PropTypes.func.isRequired,
    setScrollMode: PropTypes.func.isRequired,
    changeWorkPlanFilters: PropTypes.func.isRequired,
    setWorkPlanCurrentPage: PropTypes.func.isRequired,
};

const mapStateToProps = ({workPlanReducer}) => ({
    currentPage: workPlanReducer.currentPage,
    infiniteScroll: workPlanReducer.infiniteScroll,
    totalItemsCount: workPlanReducer.totalItemsCount,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setPageSize,
    setScrollMode,
    changeWorkPlanFilters,
    setWorkPlanCurrentPage,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Pagination);