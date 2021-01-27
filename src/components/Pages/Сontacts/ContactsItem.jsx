import './_contacts.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';


const ContactsItem = (props) => {

    const {data, userWidth} = props;

    const ColoredBlock = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: #FFFFFF;
        width: ${userWidth > 768 ? '120px' : '60px'};
        height: ${userWidth > 768 ? '120px' : '60px'};
        text-align: center;
        background: linear-gradient(to right top, ${data.gradient.start}, ${data.gradient.finish});
    `;

    const ContactsItemContent = () => {
        return (
            <>
                <div className="colored-block-wrap">
                    <ColoredBlock>
                        {data.logo}
                    </ColoredBlock>
                </div>
                <div className="contacts-description-wrap">
                    {userWidth >= 768
                        ?
                        <h3 className="contacts-item-title">
                            {data.title}
                        </h3>
                        :
                        <h3 className="contacts-item-title_mobile">
                            {data.description}
                        </h3>
                    }
                    <div className="contacts-item-link">
                        {data.description}
                    </div>
                </div>
            </>
        )
    }

    return(
        <>
            {
                data.to
                ?
                <Link
                    className="contacts-item"
                    to={data.to}
                >
                    <ContactsItemContent />
                </Link>
                :
                <a
                    className="contacts-item"
                    href={data.contact}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <ContactsItemContent />
                </a>
            }
        </>
    )
}

export default ContactsItem;