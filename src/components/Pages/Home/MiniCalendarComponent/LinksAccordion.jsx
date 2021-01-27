import './_tabs-component.scss'
import React from 'react';
import linkArrow from './icons/link-arrow.svg';


function LinksAccordion(props) {

    const {links} = props

    if (links.length === 0) {
        return null;
    }

    return (
        <ul className="calendar-event-acc-block">
            {
                links.map((link, index) =>
                    <li
                        className="calendar-event-acc-link-block"
                        key={index}>
                        <a className="calendar-event-acc-link" href={link.url} target="_blank" rel="noopener noreferrer">
                            <img className="link-arrow" src={linkArrow} alt="перейти:"/>
                            {link.title}
                        </a>
                    </li>
                )
            }
        </ul>
    );
}

export default LinksAccordion;