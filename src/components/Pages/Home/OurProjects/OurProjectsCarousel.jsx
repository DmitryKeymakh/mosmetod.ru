import "../../../../styles/slick/slick-theme.css";
import "../../../../styles/slick/slick.css";
import api from "../../../../assets/api";
import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {setProjectsList} from "../../../../actions/homePageAction";
import Slider from "react-slick";
import OurProjectsItem from "./OurProjectsItem";


const OurProjectsCarousel = (props) => {

    const {projectsList, setProjectsList} = props;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                api.ourProjects,
            );
            setProjectsList(result.data);
        };
        fetchData();
    }, []);

    const carouselConfig = {
        className: 'slider-container',
        dotsClass: 'projects-carousel-dot',
        swipeToSlide: true,
        // infinite: false,
        arrows: false,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnFocus: true,
        pauseOnDotsHover: true,
        dots: true,
        // lazyLoad: true,
        responsive: [
            {
                breakpoint: 3000,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 940,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1,
                    // dots: false,
                }
            },
        ],
    };

    return(
        <Slider {...carouselConfig}>
            {projectsList.map(item =>
                <OurProjectsItem
                    key={item.id}
                    data={item}
                />
            )}
        </Slider>
    )
}

OurProjectsCarousel.propTypes = {
    projectsList: PropTypes.array.isRequired,
    setProjectsList: PropTypes.func.isRequired,
};


const mapStateToProps = ({homePageReducer}) => ({
    projectsList: homePageReducer.projectsList,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setProjectsList,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OurProjectsCarousel);