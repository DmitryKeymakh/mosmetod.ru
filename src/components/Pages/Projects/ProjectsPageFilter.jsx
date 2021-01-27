import './_projects-page.scss'
import React from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {setArchiveDataStatus} from '../../../actions/projectsPageAction';


export const ProjectsPageFilter = (props) => {

    const {showArchive, setArchiveDataStatus} = props;

    return (
        <label
            className="control control-checkbox"
            htmlFor="in-archive-checkbox"
        >
            {/*отображать архивные проекты*/}
            архивные<br />проекты
            <input
                type="checkbox"
                id="in-archive-checkbox"
                checked={showArchive}
                onChange={() => setArchiveDataStatus(!showArchive)}
            />
            <div className="control_indicator"></div>
        </label>
    )
}

ProjectsPageFilter.propTypes = {
    showArchive: PropTypes.bool.isRequired,
    setArchiveDataStatus: PropTypes.func.isRequired,
};

const mapStateToProps = ({projectsPageReducer}) => ({
    showArchive: projectsPageReducer.showArchive,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setArchiveDataStatus,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectsPageFilter);