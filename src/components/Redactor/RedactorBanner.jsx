import './_redactor.scss';
import React from 'react';
import PropTypes from "prop-types";
import {useTrail, animated} from 'react-spring';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {
    setSelectedText,
    setSelectedTextNode,
    setRedactorStatus,
    setRedactorModalStatus,
    setErrorPositionInNode,
} from "../../actions/redactorAction";


export const RedactorBanner = (props) => {

    const {
        setSelectedText,
        setSelectedTextNode,
        setRedactorStatus,
        isRedactorOpen,
        setRedactorModalStatus,
        isRedactorModalOpen,
        setErrorPositionInNode,
    } = props;

    let selected = '';
    let selectedNode = '';

    document.onselectionchange = () => {
        selected = window.getSelection().toString();
        selectedNode = selected ? window.getSelection().anchorNode.textContent : '';
        if (!isRedactorModalOpen) {
            selected && selected.length <= 50 ? setRedactorStatus(true) : setRedactorStatus(false);
        }
    }

    const mainBlock = document.querySelector('#root');

    const clickHandler = () => {
        if(isRedactorOpen) {
            setSelectedText(window.getSelection().toString());
            setSelectedTextNode(window.getSelection().anchorNode.textContent);
            setErrorPositionInNode({
                start: Math.min(window.getSelection().anchorOffset, window.getSelection().focusOffset),
                end: Math.max(window.getSelection().anchorOffset, window.getSelection().focusOffset),
            });
            setRedactorStatus(false);
            setRedactorModalStatus(true);
            mainBlock.insertAdjacentHTML('afterbegin', `<div id="redactor-modal-overlay" style="position: fixed; z-index: 99; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.3); opacity: 1; transition: opacity 0.3s; animation: easeInOut 0.3s" />`);
        }
    }

    const config = {mass: 1, tension: 2000, friction: 200};
    const trail = useTrail(1, {
        config,
        opacity: isRedactorOpen ? 1 : 0,
        height: isRedactorOpen ? '70px' : '0px',
        from: {opacity: 0, height: '0px'},
    });

    return (
        <>
            {!isRedactorModalOpen && trail.map(({height, opacity}, index) => (
                <animated.div
                    key={index}
                    style={{opacity, height}}
                    // className="redactor-container-wrap"
                >
                    <div className={isRedactorOpen ? "redactor-container" : "redactor-container hide-block"}>
                        <p className="redactor-message">Нашли орфографическую ошибку?</p>
                        <button
                            className="redactor-button redactor-button-banner"
                            type="button"
                            onClick={() => {
                                clickHandler();
                            }}
                        >
                            Сообщить
                        </button>
                    </div>
                </animated.div>
            ))}
        </>
    )
}

RedactorBanner.propTypes = {
    setSelectedText: PropTypes.func.isRequired,
    setSelectedTextNode: PropTypes.func.isRequired,
    setRedactorStatus: PropTypes.func.isRequired,
    isRedactorOpen: PropTypes.bool.isRequired,
    isRedactorModalOpen: PropTypes.bool.isRequired,
    setRedactorModalStatus: PropTypes.func.isRequired,
    setErrorPositionInNode: PropTypes.func.isRequired,
};

const mapStateToProps = ({redactorReducer}) => ({
    isRedactorOpen: redactorReducer.isRedactorOpen,
    isRedactorModalOpen: redactorReducer.isRedactorModalOpen,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setSelectedText,
    setSelectedTextNode,
    setRedactorStatus,
    setRedactorModalStatus,
    setErrorPositionInNode,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RedactorBanner);