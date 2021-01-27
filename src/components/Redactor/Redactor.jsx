import './_redactor.scss';
import React from 'react';
import RedactorBanner from "./RedactorBanner";
import RedactorModal from "./RedactorModal";


export const Redactor = () => {

    return (
        <div className="redactor">
            <div className="redactor-wrap container">
                <RedactorBanner />
                <RedactorModal />
            </div>
        </div>
    )
}

export default Redactor;