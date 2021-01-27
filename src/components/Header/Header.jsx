import React, {Suspense} from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {setUserWidth} from '../../actions/globalAction';
import MyErrorBoundary from "../ErrorBoundary/MyErrorBoundary";
import Preloader from "../Preloader/Preloader";
const HeaderDesktop = React.lazy(() => import('./HeaderDesktop/HeaderDesktop'));
const HeaderMobile = React.lazy(() => import('./HeaderMobile/HeaderMobile'));


export const Header = (props) => {

    const {userWidth, setUserWidth} = props;

    window.addEventListener("resize", function() {
        setUserWidth(document.documentElement.clientWidth);
    }, false);


    return (
        <MyErrorBoundary
            blockName='Хэдер'
        >
            <Suspense
                fallback={<Preloader/>}
            >
                {userWidth > 1080 ? <HeaderDesktop /> : <HeaderMobile />}
            </Suspense>
        </MyErrorBoundary>
    )
}

Header.propTypes = {
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
)(Header);