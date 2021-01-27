import React from 'react';
import "./_teaching-space.scss";
import {NavLink} from "react-router-dom";
import styled from "styled-components";


function TeachingSpaceMaterialListItem(props) {

    const {data, category, color} = props;

    const ColorBlock = styled.div`
        width: ${color ? '20px' : 0};
        height: ${color ? '36px' : 0};
        background: ${data.color};
        border-radius: 50%;
        margin-left: -11px;
    `;

    return (
        <>
            <NavLink className="teaching-space-materials-list-item-block"
                     to={`/teaching-space/${category}/${data.id}`}>
                <ColorBlock />
                <div className="teaching-space-materials-list-item-desc">
                    <div className="teaching-space-materials-list-item-title">
                        {data.title}
                    </div>
                    <div className="teaching-space-materials-list-item-category">
                        {data.material_categories_name}
                    </div>
                </div>
            </NavLink>
        </>
    )
}

export default TeachingSpaceMaterialListItem;