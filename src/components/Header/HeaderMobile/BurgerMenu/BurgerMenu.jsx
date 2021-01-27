import './_burger-menu.scss';
import React, {useEffect} from 'react';
// import axios from 'axios';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {
    setMenuItems,
    toggleBurgerMenu
} from '../../../../actions/navigationAction';
// import OutsideClickHandler from "react-outside-click-handler";
import BurgerMenuItem from "./BurgerMenuItem";
import MobileFooter from "../../../Footer/MobileFooter";
import MenuItemsMain from "../../HeaderDesktop/Menu/menu-items.json";


export function BurgerMenu(props) {

    const {menuItemsList, setMenuItems, isOpenBurgerMenu, toggleBurgerMenu} = props;

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios(
    //             url,
    //         );
    //         setMenuItems(result.data);
    //     };
    //     fetchData();
    // }, [url]);

    return(
        <div className="burger-menu-wrap">
            <div className="menu-burger">
                <ul className="menu-burger-list">
                    {MenuItemsMain.map((item, index) =>
                        <BurgerMenuItem
                            key={index}
                            dataObject={item}
                        />
                    )}
                    <li className="menu-burger-item">
                        <a
                            className="menu-burger-link menu-competition-link"
                            href="https://mosmetod.ru/centr/konkursy/konkursy.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => toggleBurgerMenu(false)}
                        >
                            Конкурсы
                        </a>
                    </li>
                    <li className="menu-burger-item">
                        <a
                            className="menu-burger-link"
                            href="/site/login"
                        >
                            Вход
                        </a>
                    </li>
                </ul>
                <div className="menu-burger-footer">
                    <MobileFooter />
                </div>
            </div>
        </div>
    )
}

BurgerMenu.propTypes = {
    menuItemsList: PropTypes.array.isRequired,
    setMenuItems: PropTypes.func.isRequired,
    toggleBurgerMenu: PropTypes.func.isRequired,
    isOpenBurgerMenu: PropTypes.bool.isRequired,
};

const mapStateToProps = ({navigationReducer}) => ({
    menuItemsList: navigationReducer.menuItemsList,
    isOpenBurgerMenu: navigationReducer.isOpenBurgerMenu,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setMenuItems,
    toggleBurgerMenu,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BurgerMenu);