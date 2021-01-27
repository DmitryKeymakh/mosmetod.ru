import React from 'react';
import './_materialNewsItem.scss';
import NewsBlock from "../Pages/Home/NewsBlock/NewsBlock";
import MaterialNewsItemNavigation from "./MaterialNewsItemNavigation";
import MaterialNewsItemAuthor from "./MaterialNewsItemAuthor";
import api from "../../assets/api";
import MaterialNewsItemNewsBlock from "./MaterialNewsItemNewsBlock";


function MaterialNewsItemSideBar(props) {

    const {data, path} = props;

    return (
        <>
            <div className="material-news-item-side-bar">
                <MaterialNewsItemNavigation
                    skipLinks={data.anchors}
                    title={data.title}/>
                {
                    data.author &&
                    <MaterialNewsItemAuthor
                        author={data.author}
                        category={data.category}
                        publication={data.publication}/>
                }
                {
                    path !== "/show-preliminary-material/:id/:type/:guid" &&
                    <NewsBlock blockName={'Похожие материалы'} quantity={8} newsItemsUrl={data.id !== null ? `${api.newsListSimilar}?id=${data.id}` : false}/>
                }
                {
                    path !== "/show-preliminary-material/:id/:type/:guid" &&
                    <MaterialNewsItemNewsBlock blockName={'Лента'} quantity={8} newsItemsUrl={data.id !== null ? api.newsListByCategory : false}/>
                }
            </div>
        </>
    )
}

export default MaterialNewsItemSideBar;