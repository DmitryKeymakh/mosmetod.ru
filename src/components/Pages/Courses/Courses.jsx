import '../TeachingSpace/_teaching-space.scss';
import api from "../../../assets/api";
import React, {useEffect} from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {
    setCoursesData,
    setCoursesDataId,
} from '../../../actions/coursesAction';


export const Courses = (props) => {

    const {coursesData, setCoursesData, coursesDataId, setCoursesDataId} = props;

    const url = `${api.courses}?id=${coursesDataId}`;

    const urlArray = window.location.pathname.split('/');
    const id = urlArray[2]
    setCoursesDataId(id ? +id : 17895);


    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                url,
            );
            setCoursesData(result.data);
        };
        fetchData();
    }, [url]);

    return (
        <div className="material-news-item-content">
            {coursesData.title && <h1 className="material-news-item-content-title" id="title">
                {coursesData.title}
            </h1>}
            {coursesData.content && <div className="material-news-item-content-content-wrap">
                <div
                    className="material-news-item-content-text"
                    dangerouslySetInnerHTML={{__html: coursesData.content}}
                />
            </div>}
        </div>
    )
}

Courses.propTypes = {
    coursesData: PropTypes.object.isRequired,
    setCoursesData: PropTypes.func.isRequired,
    coursesDataId: PropTypes.number.isRequired,
    setCoursesDataId: PropTypes.func.isRequired,
};

const mapStateToProps = ({coursesReducer}) => ({
    coursesData: coursesReducer.coursesData,
    coursesDataId: coursesReducer.coursesDataId,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setCoursesData,
    setCoursesDataId,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Courses);