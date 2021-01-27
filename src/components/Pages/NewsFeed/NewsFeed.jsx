import React, {Suspense} from 'react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import "./_news-feed.scss";
import DropFilterBlock from "./DropFilterBlock";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {
    setActiveTabIndex,
    changeNewsFeedTab,
} from "../../../actions/newsFeedAction";
import MyErrorBoundary from "../../ErrorBoundary/MyErrorBoundary";
import Preloader from "../../Preloader/Preloader";
import NewsFeedWebinars from "./NewsFeedWebinars";
import NewsFeedMobileSelectSelect from "./NewsFeedMobileSelectSelect";

const NewsFeedList = React.lazy(() => import('./NewsFeedList'));


const NewsFeed = (props) => {
    const {
        activeTabIndex,
        newsCategory,
        setActiveTabIndex,
        changeNewsFeedTab,
    } = props;

    const categoryList = [
        {
            id: 1,
            category: 'Оперативная информация'
        },
        {
            id: 2,
            category: 'Анонсы'
        },
        {
            id: 3,
            category: 'СМИ о нас'
        },
        {
            id: 4,
            category: 'Вебинары'
        }
    ];

    const handleTabClick = (item) => {
        changeNewsFeedTab(item.category);
    }

    return (
        <>
            <div className="news-feed-main-wrap">
                <Tabs className="news-feed-tabs"
                      selectedIndex={activeTabIndex}
                      onSelect={tabIndex => setActiveTabIndex(tabIndex)}>
                    <TabList className="news-feed-tabs-tab-list">
                        {
                            categoryList.map((item) => (
                                <Tab className="news-feed-tabs-tab"
                                     key={item.id}
                                     onClick={() => handleTabClick(item)}>
                                    {item.category}
                                </Tab>
                            ))}
                    </TabList>
                    {
                        newsCategory === 'Вебинары' &&
                        <NewsFeedMobileSelectSelect/>
                    }
                    {
                        categoryList.map((item) => (
                            <TabPanel className="news-feed-tabs-tab-panel" key={item.id}>
                                <MyErrorBoundary>
                                    <Suspense fallback={<Preloader/>}>
                                        {
                                            newsCategory === 'Вебинары' ?
                                                <NewsFeedWebinars/> :
                                                <NewsFeedList/>
                                        }
                                    </Suspense>
                                </MyErrorBoundary>
                            </TabPanel>
                        ))}
                </Tabs>
                <DropFilterBlock/>
            </div>
        </>
    )
}

NewsFeed.propTypes = {
    activeTabIndex: PropTypes.number.isRequired,
    newsCategory: PropTypes.string.isRequired,
    setActiveTabIndex: PropTypes.func.isRequired,
    changeNewsFeedTab: PropTypes.func.isRequired,
};

const mapStateToProps = ({newsFeedReducer}) => ({
    activeTabIndex: newsFeedReducer.activeTabIndex,
    newsCategory: newsFeedReducer.newsCategory,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setActiveTabIndex,
    changeNewsFeedTab,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewsFeed);