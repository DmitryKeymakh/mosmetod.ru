import './_preloader.scss'
import PreloaderImg from './preloader.gif';
import React from 'react';




function Preloader() {

    return (
        <div className="loading">
            <img src={PreloaderImg} alt="Загрузка..."/>
        </div>
    );
}

export default Preloader;