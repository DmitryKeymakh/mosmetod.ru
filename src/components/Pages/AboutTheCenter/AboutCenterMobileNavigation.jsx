import './_about-center.scss';
import React from 'react';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {
    setBurgerOpen,
} from "../../../actions/aboutTheCenterAction";
import {slide as Menu} from 'react-burger-menu';
import OutsideClickHandler from "react-outside-click-handler";
import {NavLink} from "react-router-dom";


const AboutCenterMobileNavigation = (props) => {

    const {
        content,
        userWidth,
        burgerOpen,
        setBurgerOpen,
    } = props;

    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                setBurgerOpen(false);
            }}>
            <Menu right
                  className={"about-center-mobile-burger"}
                  overlayClassName={"about-center-mobile-burger-overlay"}
                  menuClassName={"about-center-mobile-burger-menu"}
                  width={userWidth > 460 ? 400 : '100%'}
                  isOpen={burgerOpen}
                  onClose={() => {
                      setBurgerOpen(false)
                  }}
                  disableCloseOnEsc>
                <div className="about-center-mobile-burger-block">
                    <div className="about-center-mobile-burger-header">
                        <div className="about-center-mobile-burger-header-block">
                            Сведения об образовательной организации
                        </div>
                        <svg className="about-center-burger-close-icon" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg"
                             onClick={() => {
                                 setBurgerOpen(false)
                             }}>
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M23.6605 2.68325L21.3105 0.333252L11.9938 9.64992L2.67715 0.333252L0.327148 2.68325L9.64382 11.9999L0.327148 21.3166L2.67715 23.6666L11.9938 14.3499L21.3105 23.6666L23.6605 21.3166L14.3438 11.9999L23.6605 2.68325Z"/>
                        </svg>
                    </div>
                    <div className="about-center-mobile-burger-menu-wrap">
                        {
                            Object.values(content).map((item) => {
                                    if (item.links.length > 0 || item.id === 1 || item.id === 9) {
                                        return <NavLink className="about-center-mobile-burger-menu-item"
                                                        activeClassName="about-center-mobile-burger-menu-item about-center-mobile-burger-menu-item-active"
                                                        key={item.id}
                                                        exact
                                                        to={item.id === 1 ? '/about-the-center' : `/about-the-center/${item.url}`}
                                                        onClick={() => {
                                                            setBurgerOpen(false);
                                                        }}>
                                            {item.title}
                                        </NavLink>;
                                    }
                                }
                            )
                        }
                    </div>
                </div>
            </Menu>
        </OutsideClickHandler>
    )
}

AboutCenterMobileNavigation.propTypes = {
    burgerOpen: PropTypes.bool.isRequired,
    setBurgerOpen: PropTypes.func.isRequired,
};

const mapStateToProps = ({aboutTheCenterReducer}) => ({
    burgerOpen: aboutTheCenterReducer.burgerOpen,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setBurgerOpen,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AboutCenterMobileNavigation);