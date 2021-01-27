import './_redactor.scss';
import api from "../../assets/api";
import React, {useEffect, useState, useRef} from 'react';
import PropTypes from "prop-types";
import {useTrail, animated} from 'react-spring';
import axios from "axios";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {
    setSelectedText,
    setCommentText,
    setRedactorModalStatus,
} from "../../actions/redactorAction";
import OutsideClickHandler from "react-outside-click-handler";


export const RedactorModal = (props) => {

    const {
        setSelectedText,
        selectedText,
        setCommentText,
        selectedTextNode,
        commentText,
        setRedactorModalStatus,
        isRedactorModalOpen,
        errorPositionInNode,
    } = props;

    document.onkeydown = function(evt) {
        if (isRedactorModalOpen && evt.key === 'Escape') {
            removeOverlay();
        }
    };

    const link = document.location.href;

    const browserInfo = window.navigator.userAgent;

    const url = `${api.redactor}?emphasized=${selectedText}s&url=${link}&comment=${commentText}&context=${selectedTextNode}&browser=${browserInfo}`;

    let errorText = '';

    const errorTextHandler = () => {
        const regExp = new RegExp(`${selectedText}`, 'i');
        const errorBlock = selectedText.replace(regExp, `<span style="color: #e25e10; background-color: #d6d3d3;">${selectedText}</span>`);
        const leftPart = selectedTextNode.slice(0, errorPositionInNode.start);
        const rightPart = selectedTextNode.slice(errorPositionInNode.end);
        errorText = `${leftPart}${errorBlock}${rightPart}`;
    }
    errorTextHandler();

    const inputRef = useRef(null);
    useEffect(() => {
        if (isRedactorModalOpen) {
            inputRef.current.focus();
        }
    }, [isRedactorModalOpen]);

    const submitHandler = (event) => {
        event.preventDefault();
    }

    const changeHandler = (event) => {
        setCommentText(event.target.value);
    }

    const removeOverlay = () => {
        const redactorOverlay = document.querySelector('#redactor-modal-overlay');
        if (redactorOverlay) {
            redactorOverlay.remove();
        }
        setRedactorModalStatus(false);
        setSelectedText('');
        setCommentText('')
    }

    const [status, setStatus] = useState(true);
    const clickHandler = () => {
        const fetchData = async () => {
            const result = await axios(
                url,
            );
            if (result.data.result) {
                removeOverlay();
            }
            setStatus(result.data.result);
        };
        fetchData();
    }

    const resetHandler = () => {
        removeOverlay();
    }

    const handleEnter = () => {
        clickHandler();
    }

    const keyUpHandler = (event) => {
        if (event.keyCode === 13) {
            handleEnter();
        }
    };

    const onClickOutsideHandler = () => {
        removeOverlay();
    };

    const config = {mass: 1, tension: 2000, friction: 200};
    const trail = useTrail(1, {
        config,
        opacity: isRedactorModalOpen ? 1 : 0,
        height: isRedactorModalOpen ? '250px' : '0px',
        from: {opacity: 0, height: '0px'},
    });

    return (
        <>
            {isRedactorModalOpen && <OutsideClickHandler
                onOutsideClick={onClickOutsideHandler}
            >
                {trail.map(({height, opacity}, index) => (
                    <animated.div
                        key={index}
                        style={{opacity, height}}
                        className="redactor-modal"
                    >
                        {status && <div
                            className={isRedactorModalOpen ? "redux-modal-content-wrap" : "redux-modal-content-wrap hide-block"}>
                            <p className="redactor-modal-text">Орфографическая ошибка в тексте:</p>
                            <p
                                className="redactor-modal-text redactor-text-white"
                                dangerouslySetInnerHTML={{__html: errorText}}
                            />
                            <form
                                className="redactor-modal-form"
                                onSubmit={submitHandler}
                            >
                                <label
                                    className="redactor-input-label"
                                    htmlFor="redactor-input"
                                >
                                    <p className="redactor-comment-header">
                                        Комментарий (необязательно):
                                    </p>
                                    <input
                                        className="redactor-input"
                                        type="textarea"
                                        id="area"
                                        autoComplete="off"
                                        onChange={changeHandler}
                                        ref={inputRef}
                                        value={commentText}
                                        onKeyUp={(event) => {
                                            keyUpHandler(event);
                                        }}
                                        placeholder="Ваш комментарий"
                                    />
                                </label>
                                <div className="redactor-buttons-wrap">
                                    <p className="redactor-modal-text">Отправить сообщение об ошибке?</p>
                                    <div className="redactor-buttons">
                                        <button
                                            className="redactor-button redactor-button-banner redactor-button-blue"
                                            type="submit"
                                            onClick={() => {
                                                clickHandler();
                                            }}
                                        >
                                            Отправить
                                        </button>
                                        <button
                                            className="redactor-button redactor-button-banner"
                                            type="reset"
                                            onClick={() => {
                                                resetHandler();
                                            }}
                                        >
                                            Отменить
                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>}
                        {!status && <div
                            className={isRedactorModalOpen ? "modal-error-message-block" : "modal-error-message-block hide-block"}>
                            <p className="redactor-modal-text">
                                Сервер не смог отправить письмо для подтверждения вашего Email. Обратитесь в техническую
                                поддержку <a className="redactor-modal-text redactor-error-link"
                                             href={`mailto:support@mosmetod.ru`}>support@mosmetod.ru</a>
                            </p>
                            <button
                                className="redactor-button redactor-button-blue redactor-button-error"
                                type="reset"
                                onClick={() => {
                                    resetHandler();
                                    setStatus(true);
                                }}
                            >
                                Закрыть
                            </button>
                        </div>}
                    </animated.div>
                ))}
            </OutsideClickHandler>}
        </>
    )
}

RedactorModal.propTypes = {
    selectedText: PropTypes.string.isRequired,
    setSelectedText: PropTypes.func.isRequired,
    selectedTextNode: PropTypes.string.isRequired,
    commentText: PropTypes.string.isRequired,
    setCommentText: PropTypes.func.isRequired,
    setRedactorModalStatus: PropTypes.func.isRequired,
    isRedactorModalOpen: PropTypes.bool.isRequired,
    errorPositionInNode: PropTypes.object.isRequired,
};

const mapStateToProps = ({redactorReducer}) => ({
    selectedText: redactorReducer.selectedText,
    selectedTextNode: redactorReducer.selectedTextNode,
    commentText: redactorReducer.commentText,
    isRedactorOpen: redactorReducer.isRedactorOpen,
    isRedactorModalOpen: redactorReducer.isRedactorModalOpen,
    errorPositionInNode: redactorReducer.errorPositionInNode,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setSelectedText,
    setCommentText,
    setRedactorModalStatus,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RedactorModal);