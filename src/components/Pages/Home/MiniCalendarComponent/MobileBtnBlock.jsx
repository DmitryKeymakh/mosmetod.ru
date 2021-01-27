import './_tabs-component.scss';
import close from './icons/close-acc.svg';
import open from './icons/open-acc.svg';
import React from 'react';


function MobileBtnBlock(props) {

    const {links} = props

    if (links.length === 0) {
        return null;
    }

    return (
        <>
            <img className="acc-img-close" src={close} alt="закрыть"/>
            <img className="acc-img-open" src={open} alt="открыть"/>
        </>
    );
}

export default MobileBtnBlock;