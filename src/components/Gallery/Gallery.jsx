import './_gallery.scss';
import React from 'react';
import ImageGallery from 'react-image-gallery';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";


export const Gallery = (props) => {

    const {data, userWidth} = props;

    const LeftArrow = () => {
        return (
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.140625 11.9014L1.60938 13.3701L7.85938 7.12015L1.60938 0.870147L0.140626 2.3389L4.91146 7.12015L0.140625 11.9014Z" fill="#7D7D7D"/>
            </svg>
        )
    }

    const RightArrow = () => {
        return (
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.85938 2.3389L6.39062 0.870148L0.140625 7.12015L6.39062 13.3701L7.85938 11.9014L3.08854 7.12015L7.85938 2.3389Z" fill="#7D7D7D"/>
            </svg>
        )
    }

    const renderRightNav = (onClick, disabled) => {
        return (
            <button
                className='image-gallery-custom-left-nav'
                disabled={disabled}
                onClick={onClick}
            >
                <div className="image-gallery-custom-nav">
                    <LeftArrow />
                </div>
            </button>
        )
    }

    const renderLeftNav = (onClick, disabled) => {
        return (
            <button
                className='image-gallery-custom-right-nav'
                disabled={disabled}
                onClick={onClick}
            >
                <div className="image-gallery-custom-nav">
                    <RightArrow />
                </div>
            </button>
        )
    }

    return (
        <div className="news-feed-gallery">
            <ImageGallery
                renderLeftNav={renderLeftNav}
                renderRightNav={renderRightNav}
                items={data}
                infinite={true}
                showThumbnails={userWidth >= 600}
                showFullscreenButton={true}
                showGalleryFullscreenButton={true}
                showPlayButton={false}
                showGalleryPlayButton={false}
                showNav={true}
                isRTL={false}
                thumbnailPosition={'bottom'}
            />
        </div>
    );
}

Gallery.propTypes = {
    data: PropTypes.array.isRequired,
    userWidth: PropTypes.number.isRequired,
};

const mapStateToProps = ({globalReducer}) => ({
    userWidth: globalReducer.userWidth,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Gallery);