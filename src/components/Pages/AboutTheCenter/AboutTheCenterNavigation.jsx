import React from 'react';
import './_about-center.scss';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {NavLink} from "react-router-dom";


const AboutTheCenterNavigation = (props) => {
    const {
        content,
    } = props;

    return (
        <>
            <div className="about-center-navigation-wrap">
                <div className="about-center-navigation-block">
                    <div className="about-center-navigation-header">
                        Сведения об образовательной организации
                    </div>
                    {
                        Object.values(content).map((item) => {
                                if (item.links.length > 0 || item.id === 1 || item.id === 9) {
                                    return <NavLink className="about-center-navigation-item"
                                                    activeClassName="about-center-navigation-item about-center-navigation-item-active"
                                                    key={item.id}
                                                    exact
                                                    to={item.id === 1 ? '/about-the-center' : `/about-the-center/${item.url}`}>
                                        {item.title}
                                    </NavLink>;
                                }
                            }
                        )
                    }
                </div>
            </div>
        </>
    )
}

AboutTheCenterNavigation.propTypes = {};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AboutTheCenterNavigation);