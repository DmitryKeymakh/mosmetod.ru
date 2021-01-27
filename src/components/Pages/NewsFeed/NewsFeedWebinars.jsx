import React, {Suspense} from 'react';
import "./_news-feed.scss";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {
    uploadWebinarsData,
    changeWebinarsFilter,
} from "../../../actions/newsFeedAction";
import InfiniteScroll from "react-infinite-scroll-component";
import Preloader from "../../Preloader/Preloader";
import MyErrorBoundary from "../../ErrorBoundary/MyErrorBoundary";
import NewsFeedWebinarsItem from "./NewsFeedWebinarsItem";


const NewsFeedWebinars = (props) => {
    const {
        webinarsData,
        webinarsCategory,
        webinarsFilters,
        totalItemsCount,
        uploadWebinarsData,
        changeWebinarsFilter,
    } = props;

    const handleAllFilterClick = () => {
        changeWebinarsFilter(0);
    }

    const handleFilterClick = (item) => {
        changeWebinarsFilter(item.id);
    }

    function loadMore() {
        uploadWebinarsData();
    }

    return (
        <>
            <div className="news-feed-webinars-wrap">
                <div className="news-feed-webinars-list-block">
                    <MyErrorBoundary>
                        <Suspense fallback={<Preloader/>}>
                            <InfiniteScroll
                                dataLength={webinarsData.length}
                                next={loadMore}
                                hasMore={totalItemsCount !== webinarsData.length}
                                loader={<Preloader/>}
                            >
                                <div className="news-feed-webinars-list">
                                    {
                                        webinarsData.map((item) =>
                                            <NewsFeedWebinarsItem
                                                key={item.id}
                                                data={item}/>
                                        )
                                    }
                                </div>
                            </InfiniteScroll>
                        </Suspense>
                    </MyErrorBoundary>
                </div>
                <div className="news-feed-webinars-filter-block">
                    <div className="news-feed-webinars-filter-block-header">
                        Выбор категории
                    </div>
                    {
                        webinarsFilters.length > 1 &&
                        <div className="news-feed-webinars-filter-list">
                            <div className={webinarsCategory === 0
                                ? 'news-feed-webinars-filter-all-button-active'
                                : 'news-feed-webinars-filter-all-button'}
                                 onClick={handleAllFilterClick}>
                                Все
                            </div>
                            {
                                webinarsFilters.map((item) =>
                                    <div key={item.id}
                                         className={item.id === webinarsCategory
                                             ? 'news-feed-webinars-filter-button-active'
                                             : 'news-feed-webinars-filter-button'}
                                         onClick={() => handleFilterClick(item)}>
                                        <div className="news-feed-webinars-filter-button-marker" />
                                        {item.title}
                                    </div>
                                )
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

NewsFeedWebinars.propTypes = {
    webinarsData: PropTypes.array.isRequired,
    webinarsFilters: PropTypes.array.isRequired,
    webinarsCategory: PropTypes.number.isRequired,
    totalItemsCount: PropTypes.number.isRequired,
    uploadWebinarsData: PropTypes.func.isRequired,
    changeWebinarsFilter: PropTypes.func.isRequired,
};


const mapStateToProps = ({newsFeedReducer}) => ({
    webinarsData: newsFeedReducer.webinarsData,
    totalItemsCount: newsFeedReducer.totalItemsCount,
    webinarsCategory: newsFeedReducer.webinarsCategory,
    webinarsFilters: newsFeedReducer.webinarsFilters,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    uploadWebinarsData,
    changeWebinarsFilter,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewsFeedWebinars);