import './_burger-menu.scss'
import React from 'react';
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {
    toggleBurgerMenu,
} from "../../../../actions/navigationAction";
import connect from "react-redux/es/connect/connect";


const pageScrollToTop = () => {
    window.scroll(0,0);
};

export const BurgerMenuItem = (props) => {

    const {toggleBurgerMenu} = props;

    const {title, key, url} = props.dataObject;

    const clickHandler = () => {
        pageScrollToTop();
        toggleBurgerMenu(false);
    }

    return(
        <li
            key={key}
            className="menu-burger-item"
        >
            <NavLink
                onClick={clickHandler}
                className="menu-burger-link"
                activeClassName="menu-burger-link-active"
                to={url}
                exact={url === '/'}
                strict={url !== '/'}
            >
                {title}
            </NavLink>
        </li>
    )
}

BurgerMenuItem.propTypes = {
    toggleBurgerMenu: PropTypes.func.isRequired,
};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleBurgerMenu,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BurgerMenuItem);