import './_white-button.scss';
import React from 'react';


function WhiteButton(props) {
    
    const {url, title} = props;
    
    return(
        <a
            className="white-button-link"
            href={url}
            target="_blank"
        >
            {title}
        </a>
    )
}

export default WhiteButton;