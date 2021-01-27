import './_footer.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "./icons/footer_logo.svg";
import Socials from "../Socials/Socials";


export default class Footer extends React.Component {

    render() {
        return (
            <div className="footer container">
                <div className="footer-main-block container">
                    <div className="footer-left">
                        <div className="footer-logo-block">
                            <div className="logo-patch">
                                <img src={logo} alt="ГМЦ"/>
                            </div>
                            <NavLink to="/" className="footer-logo-text">
                                <div className="logo-text-bold">Официальный сайт</div>
                                <div className="logo-text-bold">Городского методического центра</div>
                                <div className="logo-text-thin">Департамента образования и науки города Москвы</div>
                            </NavLink>
                        </div>
                        <div className="footer-menu-block">
                            <div className="footer-menu-item">
                                <NavLink className="social-header" to="/about-the-center/main-info">О центре</NavLink>
                                <div className="logo-text-thin">8 (495) 912-63-37</div>
                            </div>
                            <div className="footer-menu-item">
                                <NavLink className="social-header" to="/contacts">Контакты</NavLink>
                                <div className="logo-text-thin">gmc@edu.mos.ru</div>
                            </div>
                            <div className="footer-menu-item">
                                <div className="logo-text-thin">Воронцовская ул. 6а, стр. 1</div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-right">
                        <div className="social-header">Наши социальные сети:</div>
                        <div className="social-icons-block">
                            <Socials/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}