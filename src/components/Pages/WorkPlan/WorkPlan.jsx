import React, {useEffect} from 'react';
import './_work-plan.scss';
import WorkPlanFilterBlock from "./WorkPlanFilterBlock";
import WorkPlanEventsBlock from "./WorkPlanEventsBlock";
import WorkPlanFilterBlockMobile from "./WorkPlanFilterBlockMobile";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {setUserWidth,} from '../../../actions/globalAction';
import {WorkPlanResultList} from "./WorkPlanResultList";


const WorkPlan = (props) => {

    const {
        userWidth,
        setUserWidth,
    } = props;

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setUserWidth(document.documentElement.clientWidth);

            window.addEventListener("resize", function () {
                setUserWidth(document.documentElement.clientWidth);
            }, false);
        }
        return () => mounted = false;
    }, [setUserWidth]);

    return (
        <>
            <div className="work-plan-main-wrap">
                {userWidth > 768 ? <WorkPlanFilterBlock /> : <WorkPlanFilterBlockMobile userWidth={userWidth}/>}
                <WorkPlanEventsBlock />
            </div>
        </>
    )
}


WorkPlanResultList.propTypes = {
    userWidth: PropTypes.number.isRequired,
    setUserWidth: PropTypes.func.isRequired,
};

const mapStateToProps = ({globalReducer}) => ({
    userWidth: globalReducer.userWidth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setUserWidth,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(WorkPlan);