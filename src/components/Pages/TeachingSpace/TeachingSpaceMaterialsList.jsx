import React, {Suspense, useState} from 'react';
import "./_teaching-space.scss";
import bellIcon from './icons/bell 1.svg';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {
    setInitialTeachingSpaceData,
    uploadTeachingSpaceData,
    setTeachingSpaceInfo,
    changeTeachingSpaceCategoryFilter,
    submitSubscribe,
} from "../../../actions/teachingSpaceAction";
import TeachingSpaceDropFilter from "./TeachingSpaceDropFilter";
import InfiniteScroll from "react-infinite-scroll-component";
import Preloader from "../../Preloader/Preloader";
import TeachingSpaceMaterialListItem from "./TeachingSpaceMaterialListItem";
import TeachingSpaceMaterialListFilter from "./TeachingSpaceMaterialListFilter";
import MyErrorBoundary from "../../ErrorBoundary/MyErrorBoundary";
import TeachingSpaceDropSubscribe from "./TeachingSpaceDropSubscribe";
import {useMount} from "react-use";
import Error404 from "../Error404/Error404";


const TeachingSpaceMaterialsList = (props) => {
    const {
        isError,
        data,
        materialsCategory,
        totalItemsCount,
        materialsFilters,
        teachingSpaceInfo,
        subscribeResult,
        setTeachingSpaceInfo,
        setInitialTeachingSpaceData,
        uploadTeachingSpaceData,
        changeTeachingSpaceCategoryFilter,
        submitSubscribe,
    } = props;

    const categoryId = parseInt(props.match.params.category, 10);
    const allMaterialsFilter = 0;

    useMount(() => {
        setInitialTeachingSpaceData(categoryId);
        setTeachingSpaceInfo(categoryId);
    });

    const submitHandler = (event) => {
        event.preventDefault();
        const email = event.target.email.value;

        submitSubscribe(email, teachingSpaceInfo.id_category_parent);
    }

    const handleTabClick = () => {
        changeTeachingSpaceCategoryFilter(categoryId, allMaterialsFilter);
    }

    function loadMore() {
        uploadTeachingSpaceData(categoryId);
    }

    return isError
        ?
        <Error404/>
        :
        <>
            <div className="teaching-space-materials-list-main-wrap">
                <div className="teaching-space-materials-list-materials-block">
                    <div className="teaching-space-materials-list-header-block">
                        <div className="teaching-space-materials-list-header-wrap">
                            <div className="teaching-space-materials-list-header">
                                {`${teachingSpaceInfo.name_category_parent} / ${teachingSpaceInfo.name_category}`}
                            </div>
                            <div className="teaching-space-materials-list-header-filter-drop-wrap">
                                <TeachingSpaceDropFilter
                                    category={categoryId}/>
                                <TeachingSpaceDropSubscribe
                                    categoryId={teachingSpaceInfo.id_category_parent}
                                    categoryName={teachingSpaceInfo.name_category_parent}
                                />
                            </div>
                        </div>
                        {
                            materialsFilters.length > 1 &&
                            <div className="teaching-space-materials-list-header-filter-block">
                                <div className={materialsCategory === allMaterialsFilter
                                    ? 'teaching-space-materials-list-header-filter-button-active'
                                    : 'teaching-space-materials-list-header-filter-button'}
                                     onClick={handleTabClick}>
                                    Все
                                </div>
                                {
                                    materialsFilters.map((item) =>
                                        <div
                                            key={item.id}>
                                            <TeachingSpaceMaterialListFilter
                                                data={item}
                                                categoryId={categoryId}/>
                                        </div>
                                    )
                                }
                            </div>
                        }
                    </div>
                    <MyErrorBoundary>
                        <Suspense fallback={<Preloader/>}>
                            <InfiniteScroll
                                dataLength={data.length}
                                next={loadMore}
                                hasMore={totalItemsCount !== data.length}
                                loader={<Preloader/>}
                            >
                                <div className="teaching-space-materials-list">
                                    {
                                        data.map((item) =>
                                            <TeachingSpaceMaterialListItem
                                                key={item.id}
                                                color={materialsFilters.length > 1}
                                                category={categoryId}
                                                data={item}/>
                                        )
                                    }
                                </div>
                            </InfiniteScroll>
                        </Suspense>
                    </MyErrorBoundary>
                </div>
                <div className="teaching-space-materials-list-subscribe-wrap">
                    <div className="teaching-space-materials-list-subscribe-block">
                        <div className="teaching-space-materials-list-subscribe-header">
                            Подписка на новости
                        </div>
                        <div className="teaching-space-materials-list-subscribe-desc">
                            Для подписки на новости раздела <span
                            className="category-name">«{teachingSpaceInfo.name_category_parent}»</span> укажите Email
                        </div>
                        <form id="teaching-space-subscribe"
                              className="teaching-space-materials-list-subscribe-form"
                              autoComplete="off"
                              onSubmit={submitHandler}>
                            <input className="teaching-space-materials-list-subscribe-input"
                                   type="email"
                                   name="email"
                                   placeholder="E-mail"
                                   required={true}
                                   pattern="[^@\s]+@[^@\s]+\.[^@\s]+"/>
                            <div className="teaching-space-materials-list-subscribe-desc">
                                {subscribeResult}
                            </div>
                            <button className="teaching-space-materials-list-subscribe-button"
                                    type="submit">
                                Подписаться
                                <div className="teaching-space-materials-list-subscribe-button-bell">
                                    <img src={bellIcon} alt=">"/>
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
}

TeachingSpaceMaterialsList.propTypes = {
    isError: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    materialsFilters: PropTypes.array.isRequired,
    materialsCategory: PropTypes.number.isRequired,
    totalItemsCount: PropTypes.number.isRequired,
    teachingSpaceInfo: PropTypes.object.isRequired,
    subscribeResult: PropTypes.string.isRequired,
    setInitialTeachingSpaceData: PropTypes.func.isRequired,
    uploadTeachingSpaceData: PropTypes.func.isRequired,
    changeTeachingSpaceCategoryFilter: PropTypes.func.isRequired,
    setTeachingSpaceInfo: PropTypes.func.isRequired,
    submitSubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = ({teachingSpaceReducer}) => ({
    data: teachingSpaceReducer.data,
    isError: teachingSpaceReducer.isError,
    totalItemsCount: teachingSpaceReducer.totalItemsCount,
    materialsCategory: teachingSpaceReducer.materialsCategory,
    materialsFilters: teachingSpaceReducer.materialsFilters,
    teachingSpaceInfo: teachingSpaceReducer.teachingSpaceInfo,
    subscribeResult: teachingSpaceReducer.subscribeResult,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setInitialTeachingSpaceData,
    uploadTeachingSpaceData,
    changeTeachingSpaceCategoryFilter,
    setTeachingSpaceInfo,
    submitSubscribe,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TeachingSpaceMaterialsList);