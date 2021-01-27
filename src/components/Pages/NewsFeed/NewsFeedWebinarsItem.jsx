import React from 'react';
import "./_news-feed.scss";


function NewsFeedWebinarsItem(props) {

    const {data} = props;

    const webinarUrl = data.youtube_url;

    return (
        <>
            <a className="news-feed-webinars-item-block fade-in" href={webinarUrl} target="_blank" rel="noopener noreferrer">
                <div className="news-feed-webinars-item-desc">
                    <div className="news-feed-webinars-item-video-wrap">
                        {
                            webinarUrl &&
                            <img className="news-feed-webinars-item-video" src={`http://img.youtube.com/vi/${webinarUrl.replace(/.*\/+/gim, '')}/mqdefault.jpg`} alt="видео"/>
                        }
                    </div>
                    <div className="news-feed-webinars-item-title">
                        <div className="news-feed-webinars-item-category">{data.category}</div>
                        <div className="news-feed-webinars-item-date">{data.date}</div>
                        <div className="news-feed-webinars-item-title-text">{data.title}</div>
                    </div>
                    <div className="news-feed-webinars-item-desc-text">
                        {data.description}
                    </div>
                </div>
            </a>
        </>
    )
}

export default NewsFeedWebinarsItem;