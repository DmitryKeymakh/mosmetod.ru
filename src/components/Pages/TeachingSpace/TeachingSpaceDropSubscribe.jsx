import "../NewsFeed/_news-feed.scss";
import "./_teaching-space.scss"
import React, {useState} from 'react';
import OutsideClickHandler from "react-outside-click-handler";
import bellIcon from "./icons/bell 1.svg";
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {
    submitSubscribe,
} from "../../../actions/teachingSpaceAction";


const TeachingSpaceDropSubscribe = (props) => {
    const {
        subscribeResult,
        teachingSpaceInfo,
        submitSubscribe,
    } = props;

    const [showDropDown, setShowDropDown] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        const email = event.target.email.value;

        submitSubscribe(email, teachingSpaceInfo.id_category_parent);
    }

    const toggleDropdown = () => {
        setShowDropDown(!showDropDown);
    }

    return (
        <div className="teaching-space-materials-list-subscribe-drop-wrap">
            <OutsideClickHandler
                onOutsideClick={() => {
                    setShowDropDown(false);
                }}
            >
                <div className="teaching-space-materials-list-subscribe-drop-bell" onClick={toggleDropdown}>
                    <img src={bellIcon} alt="+"/>
                </div>
                {
                    showDropDown &&
                    <div className="teaching-space-materials-list-subscribe-drop-block">
                        <div className="teaching-space-materials-list-subscribe-drop-header">
                            Подписка на новости
                        </div>
                        <div className="teaching-space-materials-list-subscribe-drop-desc">
                            Для подписки на новости раздела <span
                            className="category-name">«{teachingSpaceInfo.name_category_parent}»</span> укажите Email
                        </div>
                        <form id="teaching-space-subscribe-drop"
                              className="teaching-space-materials-list-subscribe-drop-form"
                              autoComplete="off"
                              onSubmit={submitHandler}>
                            <input className="teaching-space-materials-list-subscribe-drop-input"
                                   type="email"
                                   name="email"
                                   placeholder="E-mail"
                                   required={true}
                                   pattern="[^@\s]+@[^@\s]+\.[^@\s]+"/>
                            <div className="teaching-space-materials-list-subscribe-drop-desc">
                                {subscribeResult}
                            </div>
                            <button className="teaching-space-materials-list-subscribe-drop-button"
                                    type="submit">
                                Подписаться
                                <div className="teaching-space-materials-list-subscribe-drop-button-bell">
                                    <img src={bellIcon} alt=">"/>
                                </div>
                            </button>
                        </form>
                    </div>
                }
            </OutsideClickHandler>
        </div>
    );
}

TeachingSpaceDropSubscribe.propTypes = {
    subscribeResult: PropTypes.string.isRequired,
    teachingSpaceInfo: PropTypes.object.isRequired,
    submitSubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = ({teachingSpaceReducer}) => ({
    subscribeResult: teachingSpaceReducer.subscribeResult,
    teachingSpaceInfo: teachingSpaceReducer.teachingSpaceInfo,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    submitSubscribe,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TeachingSpaceDropSubscribe);