import './_news-block.scss';
import React, {Suspense, useEffect, useState} from 'react';
import axios from "axios";
import Preloader from "../../../Preloader/Preloader";
import MyErrorBoundary from "../../../ErrorBoundary/MyErrorBoundary";
import BlocksHeader from "../BlocksHeader/BlocksHeader";

const NewsBlockItem = React.lazy(() => import('./NewsBlockItem'));

function NewsBlock(props) {

    const {quantity, blockName, newsItemsUrl} = props;
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(quantity);

    useEffect(() => {
        let mounted = true;
        if (mounted && newsItemsUrl) {
            const fetchData = async () => {
                const result = await axios(
                    newsItemsUrl,
                );
                setData(result.data);
            };
            fetchData();
        }
        return () => mounted = false;
    }, [newsItemsUrl]);

    if (data.length === 0) {
        return null;
    }

    return (
        <div className="news-block">
            <div className="sticky-news-block">
                <BlocksHeader
                    blockName={blockName}
                    innerUrl="/news-feed"/>
                <MyErrorBoundary blockName={blockName}>
                    <Suspense fallback={<Preloader/>}>
                        <div className="news-block-list">
                            {
                                data.slice(0, visible).map((item) => (
                                    <NewsBlockItem
                                        key={item.id}
                                        item={item}
                                        category={item.category}
                                        desc={item.desc}/>
                                ))}
                        </div>
                    </Suspense>
                </MyErrorBoundary>
            </div>
        </div>
    )
}

export default NewsBlock;