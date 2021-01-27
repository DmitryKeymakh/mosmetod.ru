import './_materialNewsItem.scss';
import React, {Suspense, useEffect, useState} from 'react';
import axios from "axios";
import BlocksHeader from "../Pages/Home/BlocksHeader/BlocksHeader";
import MyErrorBoundary from "../ErrorBoundary/MyErrorBoundary";
import Preloader from "../Preloader/Preloader";

const MaterialNewsItemNewsBlockItem = React.lazy(() => import('./MaterialNewsItemNewsBlockItem'));

function MaterialNewsItemNewsBlock(props) {

    const {quantity, blockName, newsItemsUrl} = props;
    const [data, setData] = useState([]);
    const [newsCategory, setNewsCategory] = useState('Оперативная информация');
    const [activeButtonId, setActiveButtonId] = useState(1);

    const categoryList = [
        {
            id: 1,
            category: 'Оперативная информация'
        },
        {
            id: 2,
            category: 'Анонсы'
        },
        {
            id: 3,
            category: 'СМИ о нас'
        }
    ]

    useEffect(() => {
        let mounted = true;
        if (mounted && newsItemsUrl) {
            const fetchData = async () => {
                const result = await axios(
                    `${newsItemsUrl}?category=${newsCategory}&quantity=${quantity}`,
                );
                setData(result.data);
            };
            fetchData();
        }
        return () => mounted = false;
    }, [newsItemsUrl, newsCategory]);

    return (
        <div className="material-news-item-news-block">
            <BlocksHeader
                blockName={blockName}/>
            <MyErrorBoundary blockName={blockName}>
                <Suspense fallback={<Preloader/>}>
                    <div className="material-news-item-news-block-buttons-list">
                        {
                            categoryList.map((item) => (
                                <div className={item.id === activeButtonId
                                         ? 'material-news-item-news-block-button-active'
                                         : 'material-news-item-news-block-button'}
                                     key={item.id}
                                     onClick={() => {
                                         setActiveButtonId(item.id);
                                         setNewsCategory(item.category);
                                     }}>
                                    {item.category}
                                </div>
                            ))}
                    </div>
                    <div className="material-news-item-news-block-list">
                        {
                            data.map((item) => (
                                <MaterialNewsItemNewsBlockItem
                                    key={item.id}
                                    data={item}/>
                            ))}
                    </div>
                </Suspense>
            </MyErrorBoundary>
        </div>
    )
}

export default MaterialNewsItemNewsBlock;