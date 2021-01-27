import './_tabs-component.scss'
import LinksButton from './icons/links-btn.svg';
import React, {useState} from 'react';
import LinksDropdown from "./LinksDropdown";


function DesktopBtnBlock(props) {
    const links = props.links;
    const [show, setShow] = useState(false);

    if (links.length === 0) {
        return null;
    }

    const openDropdown = () => {
        setShow(true);
    }

    const closeDropdown = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setShow(false);
        }
    }

    return (
        links.length === 1 ? (
            <div className="calendar-event-link-button">
                <a href={links[0].url} target="_blank" rel="noopener noreferrer">{links[0].title}</a>
            </div>
        ) : (
            <div className="calendar-event-drop-wrap" onClick={openDropdown} tabIndex="0"
                 onBlur={closeDropdown}>
                <div className="calendar-event-drop-button">
                    <img src={LinksButton} alt="+"/>
                </div>
                <LinksDropdown
                    show={show}
                    links={links}/>
            </div>
        )
    );
}

export default DesktopBtnBlock;