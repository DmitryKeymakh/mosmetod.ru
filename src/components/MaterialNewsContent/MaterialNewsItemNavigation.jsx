import React from 'react';
import './_materialNewsItem.scss';
import BlocksHeader from "../Pages/Home/BlocksHeader/BlocksHeader";


function MaterialNewsItemNavigation(props) {
    const {skipLinks, title} = props;

    const blockName = 'Навигация';

    return (
        <>
            {
                Object.keys(skipLinks).length > 0 &&
                <div className="material-news-item-navigation-wrap">
                    <BlocksHeader
                        blockName={blockName}/>
                    <div className="material-news-item-navigation-block">
                        <a className="material-news-item-navigation-skip-link" href="#title">{title}</a>
                        {Object.entries(skipLinks).map((item, index) => (
                            <a className="material-news-item-navigation-skip-link"
                               href={`#${item[0]}`}
                               key={index}>{item[1].title}</a>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}

export default MaterialNewsItemNavigation;