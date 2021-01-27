import './_error-block.scss';
import errorImg from './error-block-icon.svg';
import React from 'react';

function ErrorReplaceComponent(props) {

    const { blockName, report } = props;

    return (
        <div className="error-replace-block-container">
            <div className="error-replace-block-wrap">
                <div className="error-replace-block-icon">
                    <img src={errorImg} alt="ошибка"/>
                </div>
                <div className="error-replace-block-text">
                    <div className="error-replace-block-desc">
                        При загрузке блока <span className="error-replace-block-name-text">{blockName}</span> произошла ошибка,
                        попробуйте обновить страницу.
                    </div>
                    <div className="error-replace-block-report">
                        Если ошибка повторяется, пожалуйста напишите на <a className="error-replace-block-report-text" href={`mailto:${report}`}>
                        {report}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorReplaceComponent;