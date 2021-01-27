import './_mobile-footer.scss';
import React from 'react';
import {NavLink} from 'react-router-dom';
import Socials from "../Socials/Socials";


export default class MobileFooter extends React.Component {

    render() {
        return (
            <div className="mobile-footer">
                <div className="mobile-footer-social-icons-block">
                    <Socials/>
                </div>
                <div className="mobile-footer-logo-block">
                    <NavLink to="/" className="mobile-footer-logo-text">
                        <div className="logo-text-bold">Официальный сайт</div>
                        <div className="logo-text-bold">Городского методического центра</div>
                        <div className="mobile-logo-text-thin">Департамента образования и науки города Москвы</div>
                    </NavLink>
                </div>
                <div className="mobile-footer-menu-block">
                    <div className="mobile-logo-text-thin">8 (495) 912-63-37</div>
                    <div className="mobile-logo-text-thin">gmc@edu.mos.ru</div>
                    <div className="mobile-logo-text-thin">Воронцовская ул. 6а, стр. 1</div>
                </div>
            </div>
        )
    }
}