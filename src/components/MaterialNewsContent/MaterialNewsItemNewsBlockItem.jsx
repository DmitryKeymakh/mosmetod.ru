import './_materialNewsItem.scss';
import React from 'react';
import {NavLink} from "react-router-dom";


function MaterialNewsItemNewsBlockItem(props) {

    const {data} = props;

    return (
        <NavLink className="news-block-item fade-in" to={`/news-feed/${data.id}`}>
            <div className="news-block-item-date">
                {data.date}
            </div>
            <div className="news-block-item-desc">
                {data.desc}
            </div>
        </NavLink>
    )
}

export default MaterialNewsItemNewsBlockItem;