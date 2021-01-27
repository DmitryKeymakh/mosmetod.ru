import './_staff.scss';
import api from "../../../../assets/api";
import React, {Suspense, useEffect} from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import StaffCategoryItem from './StaffCategoryItem';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {
    setStaffData,
    setPersonData,
} from "../../../../actions/aboutTheCenterAction";
import MyErrorBoundary from "../../../ErrorBoundary/MyErrorBoundary";
import Preloader from "../../../Preloader/Preloader";


export const Staff = (props) => {

    const {staffData, setStaffData, setPersonData} = props;

    setPersonData({});

    const url = api.staffData;
    // const url = '/api/staff.json';

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                url,
            );
            setStaffData(result.data);
        };
        fetchData();
    }, [url]);

    return(
        <div className="staff-content">
            <MyErrorBoundary blockName={'Персонал'}>
                <Suspense fallback={<Preloader/>}>
                    {staffData.map(item =>
                        <StaffCategoryItem key={item.id} data={item} />
                    )}
                </Suspense>
            </MyErrorBoundary>
        </div>
    )
}

Staff.propTypes = {
    staffData: PropTypes.array.isRequired,
    setStaffData: PropTypes.func.isRequired,
    setPersonData: PropTypes.func.isRequired,
};

const mapStateToProps = ({aboutTheCenterReducer}) => ({
    staffData: aboutTheCenterReducer.staffData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setStaffData,
    setPersonData,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Staff);