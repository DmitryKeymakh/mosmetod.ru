import './_header-desktop.scss';
import api from "../../../assets/api";
import React from 'react';
import Logo from '../../Logo/Logo';
import DropdownProfile from './DropdownProfile/DropdownProfile';
import Menu from './Menu/Menu';
import SearchDesktop from './SearchDesktop/SearchDesktop';


export default class HeaderDesktop extends React.Component {

    render() {
        return (
            <div className="header">
                <div className="header-container container">
                    <div className="logo-desktop">
                        <Logo title={'mosmetod.ru'} description={'Официальный сайт Городского методического центра'} />
                    </div>
                    <DropdownProfile />
                    <Menu url={api.menuItems} />
                    <SearchDesktop />
                </div>
            </div>
        )
    }
}