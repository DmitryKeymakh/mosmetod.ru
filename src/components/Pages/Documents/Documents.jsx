import React from 'react';
import "./_documents.scss";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {
    uploadDocumentsData,
    setInitialDocumentsData,
    changeDocumentsData,
    setFiltersList,
} from "../../../actions/documentsAction";
import InfiniteScroll from "react-infinite-scroll-component";
import Preloader from "../../Preloader/Preloader";
import BlocksHeader from "../Home/BlocksHeader/BlocksHeader";
import DocumentsFilter from "./DocumentsFilter";
import DocumentsItem from "./DocumentsItem";
import {useMount} from 'react-use';


const Documents = (props) => {
    const {
        data,
        documentsCategory,
        totalItemsCount,
        documentsFiltersList,
        uploadDocumentsData,
        setInitialDocumentsData,
        setFiltersList,
        changeDocumentsData,
    } = props;

    useMount(() => {
        setInitialDocumentsData();
        setFiltersList();
    });

    const handleTabClick = () => {
        changeDocumentsData(0);
    }

    const loadMore = () => {
        uploadDocumentsData();
    }

    return (
        <>
            <div className="documents-main-wrap">
                <BlocksHeader
                    blockName="Документы"/>
                <div className="teaching-space-materials-list-header-block">
                    {
                        documentsFiltersList.length > 1 &&
                        <div className="teaching-space-materials-list-header-filter-block">
                            <div className={documentsCategory === 0
                                ? 'teaching-space-materials-list-header-filter-button-active'
                                : 'teaching-space-materials-list-header-filter-button'}
                                 onClick={handleTabClick}>
                                Все
                            </div>
                            {
                                documentsFiltersList.map((item) =>
                                    <div
                                        key={item.id}>
                                        <DocumentsFilter
                                            data={item}/>
                                    </div>
                                )
                            }
                        </div>
                    }
                </div>
                <InfiniteScroll
                    dataLength={data.length}
                    next={loadMore}
                    hasMore={totalItemsCount !== data.length}
                    loader={<Preloader/>}
                >
                        <div className="documents-materials-list">
                            {
                                data.map((item) =>
                                    <DocumentsItem
                                        key={item.id}
                                        data={item}
                                        color={documentsFiltersList.length > 1}/>
                                )
                            }
                        </div>
                </InfiniteScroll>
            </div>
        </>
    )
}

Documents.propTypes = {
    data: PropTypes.array.isRequired,
    documentsFiltersList: PropTypes.array.isRequired,
    documentsCategory: PropTypes.number.isRequired,
    totalItemsCount: PropTypes.number.isRequired,
    uploadDocumentsData: PropTypes.func.isRequired,
    setInitialDocumentsData: PropTypes.func.isRequired,
    setFiltersList: PropTypes.func.isRequired,
    changeDocumentsData: PropTypes.func.isRequired,
};

const mapStateToProps = ({documentsReducer}) => ({
    data: documentsReducer.data,
    totalItemsCount: documentsReducer.totalItemsCount,
    documentsCategory: documentsReducer.documentsCategory,
    documentsFiltersList: documentsReducer.documentsFiltersList,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    uploadDocumentsData,
    setInitialDocumentsData,
    setFiltersList,
    changeDocumentsData,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Documents);