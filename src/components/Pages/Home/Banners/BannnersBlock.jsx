import "../../../../styles/slick/slick-theme.css";
import "../../../../styles/slick/slick.css";
import './_banners-block.scss';
import depobr from './images/depobr.png';
import knowmoscow from './images/knowmoscow.png';
import osobrtv from './images/mosobrtv.png';
import mosru from './images/mosru.png';
import mprf from './images/mprf.png';
import opendep from './images/opendep.png';
import ug from './images/ug.png';
import vovmosru from './images/vovmosru.png';
import React from "react";
import Slider from "react-slick";


const data = [
    {
        "alt": "Департамент образования",
        "image": depobr,
        "url": "https://www.mos.ru/donm/"
    },
    {
        "alt": "Узнай Москву",
        "image": knowmoscow,
        "url": "http://um.mos.ru/"
    },
    {
        "alt": "МосОбрТВ",
        "image": osobrtv,
        "url": "http://mosobr.tv/"
    },
    {
        "alt": "МосРу",
        "image": mosru,
        "url": "https://www.mos.ru/"
    },
    {
        "alt": "Министерство просвещения",
        "image": mprf,
        "url": "https://edu.gov.ru/"
    },
    {
        "alt": "Открытый департамент",
        "image": opendep,
        "url": "http://video.dogm.mos.ru/"
    },
    {
        "alt": "Учительская газета",
        "image": ug,
        "url": "http://ug.educom.ru/"
    },
    {
        "alt": "Виртуальный музей",
        "image": vovmosru,
        "url": "https://vov.mos.ru/title?redirect_url=%2Fhome%2Fexhibits"
    },
];


const carouselConfig = {
    className: 'slider-banners',
    swipeToSlide: true,
    // infinite: false,
    arrows: false,
    centerMode: true,
    variableWidth: true,
    speed: 800,
    // slidesToShow: 4,
    // slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnFocus: true,
    dots: false,
    responsive: [
        {
            breakpoint: 3000,
            settings: {
                // slidesToShow: 5,
            }
        },
        {
            breakpoint: 2000,
            settings: {
                // slidesToShow: 4,
            }
        },
        {
            breakpoint: 1280,
            settings: {
                // slidesToShow: 3,
            }
        },
        {
            breakpoint: 940,
            settings: {
                // slidesToShow: 2,
            }
        },
        {
            breakpoint: 520,
            settings: {
                // slidesToShow: 1,
            }
        },
    ],
};

export const BannersBlock = () => {

    return (
        <div className="banners-block">
            <Slider {...carouselConfig}>
                {data.map((item, id) => {
                return (
                    <a
                        className="banners-block-link"
                        key={id}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            className="banners-block-image"
                            loading="lazy"
                            src={item.image}
                            alt={item.alt}
                        />
                    </a>
                )
            })}
            </Slider>
        </div>
    )
}

export default BannersBlock;