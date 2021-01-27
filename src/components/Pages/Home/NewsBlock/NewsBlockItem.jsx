import './_news-block.scss';
import React from 'react';
import {NavLink} from "react-router-dom";


function NewsBlockItem(props) {

    return (
        <NavLink className="news-block-item" to={`/news-feed/${props.item.id}`}>
            <div className="news-block-item-date">
                {props.item.date}
            </div>
            <div className="news-block-item-category">
                {props.item.category}
            </div>
            <div className="news-block-item-desc">
                {props.item.title}
            </div>
        </NavLink>
    )
}

export default NewsBlockItem;