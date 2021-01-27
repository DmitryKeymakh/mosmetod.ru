import React from 'react';
import {NavLink} from "react-router-dom";
import styled from 'styled-components';


function BlocksHeader(props) {
    const {blockName, innerUrl, outerUrl} = props;
    const HeaderBlock = styled.div`
        padding: 9px 0;
        border-bottom: 1px solid rgba(36, 36, 36, 0.1);
        margin-bottom: 20px;
    `;
    const HeaderName = styled.div`
        font-weight: bold;
        font-size: 1.37rem;
        line-height: 1.62rem;
        display: flex;
        align-items: center;
        color: #363636;
        
        @media (max-width: 360px) {
            font-size: 1.3rem;
        }
    `;

    return (
        <HeaderBlock>
            {
                outerUrl &&
                <HeaderName>
                    <a href={outerUrl} target="_blank" rel="noopener noreferrer">
                        {blockName}
                    </a>
                </HeaderName>
            }
            {
                innerUrl &&
                <HeaderName>
                    <NavLink to={innerUrl}>
                        {blockName}
                    </NavLink>
                </HeaderName>
            }
            {
                !innerUrl && !outerUrl &&
                <HeaderName>
                    {blockName}
                </HeaderName>
            }
        </HeaderBlock>
    );
}

export default BlocksHeader;