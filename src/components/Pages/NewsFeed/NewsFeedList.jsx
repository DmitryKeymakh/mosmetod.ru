import React from 'react';
import "./_news-feed.scss";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {
    setInitialNewsFeedData,
    uploadNewsFeedData,
} from "../../../actions/newsFeedAction";
import Preloader from "../../Preloader/Preloader";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsFeedListItem from "./NewsFeedListItem";
import {useMount} from 'react-use';


const NewsFeedList = (props) => {
    const {
        data,
        totalItemsCount,
        setInitialNewsFeedData,
        uploadNewsFeedData,
    } = props;

    useMount(() => {
        setInitialNewsFeedData();
    });

    function loadMore() {
        uploadNewsFeedData();
    }

    return (
        <>
            <InfiniteScroll
                dataLength={data.length}
                next={loadMore}
                hasMore={totalItemsCount !== data.length}
                loader={<Preloader/>}
            >
                <div className="news-feed-tabs-tab-content">
                    {
                        data.map((item) => (
                            <NewsFeedListItem key={item.id} newsFeedItem={item}/>
                        ))}
                </div>
            </InfiniteScroll>
        </>
    )
}

NewsFeedList.propTypes = {
    data: PropTypes.array.isRequired,
    totalItemsCount: PropTypes.number.isRequired,
    setInitialNewsFeedData: PropTypes.func.isRequired,
    uploadNewsFeedData: PropTypes.func.isRequired,
};

const mapStateToProps = ({newsFeedReducer}) => ({
    data: newsFeedReducer.data,
    totalItemsCount: newsFeedReducer.totalItemsCount,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setInitialNewsFeedData,
    uploadNewsFeedData,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewsFeedList);