import './_menu.scss';
import MenuItemsMain from "./menu-items.json";
import React, {useEffect} from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {
    setMenuItems,
} from '../../../../actions/navigationAction';
import MenuItem from './MenuItem';


export const Menu = (props) => {

    const {menuItemsList, setMenuItems} = props;

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await axios(
    //             "./menu-items.json",
    //         );
    //         setMenuItems(result.data);
    //     };
    //     fetchData();
    // }, []);

    return (
        <ul className="menu">
            {
                MenuItemsMain.map((item, index) =>
                    <MenuItem
                        key={index}
                        data={item}
                    />
                )
            }
            <li className="menu-list-item">
                <a
                    className="menu-list-link menu-competition-link"
                    href="https://konkurs.mosmetod.ru"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Конкурсы
                </a>
            </li>
        </ul>
    )
}

Menu.propTypes = {
    menuItemsList: PropTypes.array.isRequired,
    setMenuItems: PropTypes.func.isRequired,
};

const mapStateToProps = ({navigationReducer}) => ({
    menuItemsList: navigationReducer.menuItemsList,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setMenuItems,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Menu);