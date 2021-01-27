import React from 'react';
import "./_teaching-space.scss";
import styled from "styled-components";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {
    changeTeachingSpaceCategoryFilter,
} from "../../../actions/teachingSpaceAction";


const TeachingSpaceMaterialListFilter = (props) => {

    const {
        data,
        materialsCategory,
        categoryId,
        changeTeachingSpaceCategoryFilter,
    } = props;

    const Color = styled.div`
        width: 16px;
        height: 16px;
        background: ${data.color};
        margin-right: 8px;
        border-radius: 50%;
    `;


    const handleTabClick = (item) => {
        changeTeachingSpaceCategoryFilter(categoryId, item.id);
    }

    return (
        <>
            <div className={data.id === materialsCategory
                ? 'teaching-space-materials-list-header-filter-button-active'
                : 'teaching-space-materials-list-header-filter-button'}
                 onClick={() => handleTabClick(data)}>
                <Color />
                {data.title}
            </div>
        </>
    )
}

TeachingSpaceMaterialListFilter.propTypes = {
    materialsCategory: PropTypes.number.isRequired,
    changeTeachingSpaceCategoryFilter: PropTypes.func.isRequired,
};

const mapStateToProps = ({teachingSpaceReducer}) => ({
    materialsCategory: teachingSpaceReducer.materialsCategory,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changeTeachingSpaceCategoryFilter,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TeachingSpaceMaterialListFilter);