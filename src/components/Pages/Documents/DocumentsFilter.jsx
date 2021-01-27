import React from 'react';
import "../TeachingSpace/_teaching-space.scss";
import styled from "styled-components";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {changeDocumentsData} from "../../../actions/documentsAction";


const DocumentsFilter = (props) => {

    const {
        data,
        documentsCategory,
        changeDocumentsData,
    } = props;

    const Color = styled.div`
        width: 16px;
        height: 16px;
        background: ${data.color};
        margin-right: 8px;
        border-radius: 50%;
    `;


    const handleTabClick = (item) => {
        changeDocumentsData(item.id)
    }

    return (
        <>
            <div className={data.id === documentsCategory
                ? 'teaching-space-materials-list-header-filter-button-active'
                : 'teaching-space-materials-list-header-filter-button'}
                 onClick={() => handleTabClick(data)}>
                <Color />
                {data.title}
            </div>
        </>
    )
}

DocumentsFilter.propTypes = {
    documentsCategory: PropTypes.number.isRequired,
    changeDocumentsData: PropTypes.func.isRequired,
};

const mapStateToProps = ({documentsReducer}) => ({
    documentsCategory: documentsReducer.documentsCategory,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    changeDocumentsData,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DocumentsFilter);