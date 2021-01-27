import './_header-mobile.scss'
import React from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {
    setMenuItems,
    toggleBurgerMenu,
} from '../../../actions/navigationAction';
import {
    setUserSearchQuery,
    setLiveSearchData,
} from '../../../actions/searchAction';
import {slide as Menu} from 'react-burger-menu';
import Logo from "../../Logo/Logo";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import SearchMobile from "./SearchMobile/SearchMobile";


const BurgerOpenIcon = () => {
    return (
        <svg width="22" height="22" viewBox="0 0 30 20"  xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.52681 20H30V16.6667H5.52681V20ZM12.4654 11.6667H30V8.33333H12.4654V11.6667ZM0 0V3.33333H30V0H0Z"/>
        </svg>
    )
}

const BurgerCloseIcon = () => {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.6605 2.68325L21.3105 0.333252L11.9938 9.64992L2.67715 0.333252L0.327148 2.68325L9.64382 11.9999L0.327148 21.3166L2.67715 23.6666L11.9938 14.3499L21.3105 23.6666L23.6605 21.3166L14.3438 11.9999L23.6605 2.68325Z"/>
        </svg>
    )
}

export const HeaderMobile = (props) => {

    const {isOpenBurgerMenu, toggleBurgerMenu, userWidth, setUserSearchQuery, setLiveSearchData} = props;

    return (
        <>
            <div className="header-mobile container">
                <div className="header-mobile-container">
                    <div
                        className="logo-mobile"
                        onClick={() => toggleBurgerMenu(false)}
                    >
                        <Logo />
                    </div>
                    <div className="search-burger-container">
                        <SearchMobile />
                        <div
                            className="burger-icon-container"
                            onClick={() => {
                                toggleBurgerMenu(!isOpenBurgerMenu);
                                setLiveSearchData([]);
                            }}
                        >
                            {isOpenBurgerMenu ? <BurgerCloseIcon /> : <BurgerOpenIcon />}
                        </div>
                    </div>
                </div>
            </div>
            <Menu
                width={userWidth >= 550 ? 500 : '100%'}
                disableCloseOnEsc
                onClose={() => toggleBurgerMenu(false)}
                isOpen={isOpenBurgerMenu}
                customBurgerIcon={false}
                id="burger-menu"
            >
                <BurgerMenu />
            </Menu>
        </>
    )
}

HeaderMobile.propTypes = {
    menuItemsList: PropTypes.array.isRequired,
    setMenuItems: PropTypes.func.isRequired,
    toggleBurgerMenu: PropTypes.func.isRequired,
    isOpenBurgerMenu: PropTypes.bool.isRequired,
    userWidth: PropTypes.number.isRequired,
    setUserSearchQuery: PropTypes.func.isRequired,
    setLiveSearchData: PropTypes.func.isRequired,
};

const mapStateToProps = ({navigationReducer, globalReducer}) => ({
    menuItemsList: navigationReducer.menuItemsList,
    isOpenBurgerMenu: navigationReducer.isOpenBurgerMenu,
    userWidth: globalReducer.userWidth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setMenuItems,
    toggleBurgerMenu,
    setUserSearchQuery,
    setLiveSearchData,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HeaderMobile);
