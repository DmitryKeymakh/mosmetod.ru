import "./_news-feed.scss";
import React from 'react';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {NavLink} from "react-router-dom";


const NewsFeedListItem = (props) => {
    const {
        newsFeedItem,
    } = props;

    return (
        <NavLink className={newsFeedItem.hits ?
            'news-feed-tabs-tab-content-item-important' :
            'news-feed-tabs-tab-content-item'}
                 to={`/news-feed/${newsFeedItem.id}`}>
            <div className="news-feed-tabs-tab-content-item-date">
                {newsFeedItem.date}
            </div>
            <div className="news-feed-tabs-tab-content-item-text-block">
                {
                    newsFeedItem.title &&
                    <div className="news-feed-tabs-tab-content-item-title">
                        {newsFeedItem.title}
                    </div>
                }
                {
                    newsFeedItem.desc &&
                    <div className="news-feed-tabs-tab-content-item-desc">
                        {newsFeedItem.desc}
                    </div>
                }
                {
                    newsFeedItem.hits &&
                    <div className="news-feed-tabs-tab-content-item-important-marker">
                        Важное
                    </div>
                }
            </div>
        </NavLink>
    );
}

NewsFeedListItem.propTypes = {
    newsFeedItem: PropTypes.object.isRequired,
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewsFeedListItem);