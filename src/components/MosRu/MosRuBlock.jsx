import './_mos-ru.scss';
import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";


export const MosRuBlock = (props) => {

    const {path} = props;

    useEffect(
        () => {
            const script = document.createElement('script');

            script.src = `https://www.mos.ru/otrasli-static/outer/mosTizer.js`;
            script.id = 'mosru';
            script.async = true;

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            }
        }
    );

    return (
        <div
            className={path === '/' ? "tizer-block container-fluid container" : "tizer-block container-fluid container tizer-block-hide"}
        >
            <div className="tizer-block__row">
                <div className="tizer-block__col">
                    <div className="tizer-block__banner"
                         data-mos-teaser='{ "scroll":false,"adaptive":null,"placementParams":{ "p1":"bxdrg","p2":"fpkh"}}'>
                    </div>
                    <div className="tizer-block__banner"
                         data-mos-teaser='{ "scroll":false,"adaptive":null,"placementParams":{ "p1":"bxdrh","p2":"fpkh"}}'>
                    </div>
                    <div className="tizer-block__banner"
                         data-mos-teaser='{ "scroll":false,"adaptive":null,"placementParams":{ "p1":"bxdri","p2":"fpkh"}}'>
                    </div>
                    <div className="tizer-block__banner"
                         data-mos-teaser='{ "scroll":false,"adaptive":["phone","desktop"],"adaptiveOptions":{ "tabletWidth":1200,"phoneWidth":810},"placementParams":{ "p1":"bxdrj","p2":"fpkh"}}'>
                    </div>
                </div>
            </div>
        </div>
    )
}

MosRuBlock.propTypes = {
    path: PropTypes.string.isRequired,
};

const mapStateToProps = ({router}) => ({
    path: router.location.pathname,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MosRuBlock);