import './_projects-page.scss';
import api from '../../../assets/api';
import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {
    setProjectsPageData,
    setLiveSearchData,
} from '../../../actions/projectsPageAction';
import OurProjectsItem from "../Home/OurProjects/OurProjectsItem";
import ProjectsPageSearchForm from "./ProjectsPageSearchForm";
import ProjectsPageFilter from "./ProjectsPageFilter";


export const Projects = (props) => {

    const {projectsPageData, setProjectsPageData, projectsPageQuery, showArchive, liveSearchData, setLiveSearchData} = props;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                api.projectPage,
            );
            setProjectsPageData(result.data);
            setLiveSearchData(result.data);
        };
        fetchData();
    }, [api.projectPage]);

    useEffect(() => {
        let result = [];
        const regExp = new RegExp(`${projectsPageQuery}`, 'i');
        projectsPageData.map(item => {if (item.title.match(regExp)) result = [...result, item]});
        setLiveSearchData(!projectsPageQuery.length ? projectsPageData : result);
    }, [projectsPageQuery]);


    return(
        <div className="projects-page">
            <div className="projects-page-live-search">
                <div className="projects-page-form">
                    <ProjectsPageSearchForm />
                </div>
                <div className="projects-page-filter">
                    <ProjectsPageFilter />
                </div>
            </div>
            <div className="projects-page-list">
                {
                    showArchive
                    ?
                    liveSearchData.map(item =>
                        <OurProjectsItem
                            key={item.id}
                            projectsPage={true}
                            data={item}
                        />
                    )
                    :
                    liveSearchData.filter(item => item.in_archive === false).map(item =>
                        <OurProjectsItem
                            key={item.id}
                            projectsPage={true}
                            data={item}
                        />
                    )
                }
            </div>
        </div>
    )
}

Projects.propTypes = {
    projectsPageData: PropTypes.array.isRequired,
    setProjectsPageData: PropTypes.func.isRequired,
    projectsPageQuery: PropTypes.string.isRequired,
    showArchive: PropTypes.bool.isRequired,
    liveSearchData: PropTypes.array.isRequired,
    setLiveSearchData: PropTypes.func.isRequired,
};

const mapStateToProps = ({projectsPageReducer}) => ({
    projectsPageData: projectsPageReducer.projectsPageData,
    projectsPageQuery: projectsPageReducer.projectsPageQuery,
    showArchive: projectsPageReducer.showArchive,
    liveSearchData: projectsPageReducer.liveSearchData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setProjectsPageData,
    setLiveSearchData,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Projects);