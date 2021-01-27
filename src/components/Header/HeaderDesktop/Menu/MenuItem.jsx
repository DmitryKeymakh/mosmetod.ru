import './_menu.scss';
import React, {useState} from 'react';
import PropTypes from "prop-types";
import {Link, NavLink} from 'react-router-dom';
// import {animated, Transition} from "react-spring/renderprops";


export const MenuItem = (props) => {

    const {data} = props;

    // const [showToggle, setShowToggle] = useState(false);
    //
    // const menuToggle = () => {
    //     setShowToggle(!showToggle);
    // };

    const pageScrollToTop = () => {
        window.scroll(0, 0);
    };

    const clickHandler = () => {
        pageScrollToTop();
    }

    return (
        <li
            className="menu-list-item"
            onClick={clickHandler()}
            // onMouseEnter={menuToggle()}
            // onMouseLeave={menuToggle()}
        >
            <NavLink
                className="menu-list-link"
                activeClassName="menu-list-link-active"
                to={data.url}
                exact={data.url === '/'}
                strict={data.url !== '/'}
            >
                {data.title}
            </NavLink>
            {/*<Transition*/}
            {/*    native*/}
            {/*    items={showToggle}*/}
            {/*    from={{ opacity: 0, transition: '0.05s' }}*/}
            {/*    enter={{ opacity: 1, display: 'flex' }}*/}
            {/*    leave={{ opacity: 0, display: 'none' }}*/}
            {/*>*/}
            {/*    {show =>*/}
            {/*        (data.dropdownMenu.length !== 0) && show && (props =>*/}
            {/*            <animated.div*/}
            {/*                className="dropdown-menu-wrap container"*/}
            {/*                style={props}*/}
            {/*            >*/}
            {/*                <ul className="dropdown-menu">*/}
            {/*                    {*/}
            {/*                        data.dropdownMenu.map((item) =>*/}
            {/*                            <li*/}
            {/*                                className="dropdown-menu-item"*/}
            {/*                                key={item.key}>*/}
            {/*                                <Link*/}
            {/*                                    className="dropdown-menu-item-link"*/}
            {/*                                    onClick={pageScrollToTop()}*/}
            {/*                                    to={item.url}*/}
            {/*                                >*/}
            {/*                                    {item.title}*/}
            {/*                                </Link>*/}
            {/*                            </li>*/}
            {/*                        )*/}
            {/*                    }*/}
            {/*                </ul>*/}
            {/*            </animated.div>*/}
            {/*        )*/}
            {/*    }*/}
            {/*</Transition>*/}
        </li>
    )
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default MenuItem;