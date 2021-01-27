import React, {useState} from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {changeWebinarsFilter} from "../../../actions/newsFeedAction";
import connect from "react-redux/es/connect/connect";



const NewsFeedMobileSelectSelect = (props) => {
    const {
        webinarsCategory,
        webinarsFilters,
        changeWebinarsFilter,
    } = props;

    const [isSelectOpen, setIsSelectOpen] = useState(false);

    const handleAllFilterClick = () => {
        changeWebinarsFilter(0);
        setIsSelectOpen(false);
    }

    const handleFilterClick = (item) => {
        changeWebinarsFilter(item.id);
        setIsSelectOpen(false);
    }


    return (
        <div className="news-feed-webinars-filter-select">
            <div className="news-feed-webinars-filter-select-header-block"
            onClick={() => setIsSelectOpen(!isSelectOpen)}>
                <div className="news-feed-webinars-filter-select-header-title">
                    Выбор категории
                    <svg className={isSelectOpen ?
                        "news-feed-webinars-filter-select-chevron-active" :
                        "news-feed-webinars-filter-select-chevron"}
                         viewBox="0 0 19 12"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.76499 11.5762L9.57876 4.77725L16.3925 11.5762L18.4856 9.48306L9.57876 0.576172L0.671875 9.48306L2.76499 11.5762Z" />
                    </svg>
                </div>
            </div>
            {
                isSelectOpen &&
                <div className="news-feed-webinars-filter-select-list">
                    <div className={webinarsCategory === 0
                        ? 'news-feed-webinars-filter-select-mobile-all-button-active'
                        : 'news-feed-webinars-filter-select-mobile-all-button'}
                         onClick={handleAllFilterClick}>
                        Все
                    </div>
                    {
                        webinarsFilters.map((item) =>
                            <div key={item.id}
                                 className={item.id === webinarsCategory
                                     ? 'news-feed-webinars-filter-select-mobile-button-active'
                                     : 'news-feed-webinars-filter-select-mobile-button'}
                                 onClick={() => handleFilterClick(item)}>
                                <div className="news-feed-webinars-filter-button-marker" />
                                {item.title}
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
}

NewsFeedMobileSelectSelect.propTypes = {
    webinarsCategory: PropTypes.number.isRequired,
    changeWebinarsFilter: PropTypes.func.isRequired,
};

const mapStateToProps = ({newsFeedReducer}) => ({
    webinarsCategory: newsFeedReducer.webinarsCategory,
    webinarsFilters: newsFeedReducer.webinarsFilters,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changeWebinarsFilter,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewsFeedMobileSelectSelect);