import React from 'react';
import "./_documents.scss";
import {NavLink} from "react-router-dom";
import styled from "styled-components";


function DocumentsItem(props) {

    const {data, color} = props;

    const ColorBlock = styled.div`
        width: ${color ? '20px' : 0};
        height: ${color ? '36px' : 0};
        background: ${data.color};
        border-radius: 50%;
        margin-left: -11px;
    `;

    return (
        <>
            <NavLink className="documents-materials-list-item-block fade-in"
                     to={`/documents/${data.id}`}>
                <ColorBlock />
                <div className="documents-materials-list-item-title">
                    {data.title}
                </div>
            </NavLink>
        </>
    )
}

export default DocumentsItem;