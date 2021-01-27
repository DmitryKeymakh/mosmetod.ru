import React from 'react';
import './_materialNewsItem.scss';
import BlocksHeader from "../Pages/Home/BlocksHeader/BlocksHeader";
import anonymousPhoto from "../../assets/images/anonymous.png"


function MaterialNewsItemAuthor(props) {
    const {author, category, publication} = props;

    const blockName = 'Автор';

    return (
        <>
            <div className="material-news-item-author-wrap">
                <BlocksHeader
                    blockName={blockName}/>
                <div className="material-news-item-author-block">
                    <img className="material-news-item-author-photo"
                         src={author.photo ? author.photo : anonymousPhoto}
                         alt="фото"/>
                    <div className="material-news-item-author-name">{author.name}</div>
                    <div className="material-news-item-author-material">
                        <div className="material-news-item-author-material-category">
                            {category.name}
                        </div>
                        <div className="material-news-item-author-material-date">
                            {publication}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MaterialNewsItemAuthor;