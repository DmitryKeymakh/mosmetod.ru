import './_tabs-component.scss'
import React from 'react';


function LinksDropdown(props) {

    const {show, links} = props;

    if (!show) {
        return null;
    }

    return (
        <ul className="calendar-event-drop-block fade-in">
            {
                links.map((link, index) =>
                    <li
                        className="calendar-event-drop-link-block"
                        key={index}>
                        <a className="calendar-event-drop-link" href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
                    </li>
                )
            }
        </ul>
    );
}

export default LinksDropdown;