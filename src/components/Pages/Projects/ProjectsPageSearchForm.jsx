import './_projects-page.scss'
import React from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {setProjectsPageQuery} from '../../../actions/projectsPageAction';


export const ProjectsPageSearchForm = (props) => {

    const {projectsPageQuery, setProjectsPageQuery} = props;

    const changeHandler = (event) => {
        setProjectsPageQuery(event.target.value);
    }

    return (
        <input
            className="projects-page-form-input"
            aria-label="search"
            name="search"
            type="search"
            placeholder="Поиск"
            autoComplete="off"
            onChange={changeHandler}
            value={projectsPageQuery}
        />
    )
}

ProjectsPageSearchForm.propTypes = {
    projectsPageQuery: PropTypes.string.isRequired,
    setProjectsPageQuery: PropTypes.func.isRequired,
};

const mapStateToProps = ({projectsPageReducer}) => ({
    projectsPageQuery: projectsPageReducer.projectsPageQuery,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setProjectsPageQuery,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProjectsPageSearchForm);