import './_home.scss';
import api from "../../../assets/api";
import React from 'react';
import OurProjects from "./OurProjects/OurProjects";
import MiniCalendarComponent from "./MiniCalendarComponent/MiniCalendarComponent";
import NewsBlock from "./NewsBlock/NewsBlock";
// import Competitions from "./Competitions/Competitions";
import BannersBlock from "./Banners/BannnersBlock";


export const Home = () => {

    return (
        <div className="home-page-block">
            <OurProjects />
            <MiniCalendarComponent />
            <NewsBlock blockName={'Лента'} quantity={8} newsItemsUrl={api.newsItems} />
            {/*<Competitions url={api.competitions} />*/}
            <BannersBlock />
        </div>
    )
}

export default Home;