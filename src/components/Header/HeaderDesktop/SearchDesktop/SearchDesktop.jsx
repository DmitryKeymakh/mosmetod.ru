import './_search-desktop.scss';
import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {useTrail, useTransition, animated} from 'react-spring';
import OutsideClickHandler from 'react-outside-click-handler';
import SearchForm from "./SearchForm";
// import SearchTagsBlock from "./SearchTagsBlock";
import SearchResultDropdown from "./SearchResultList";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {
    toggleSearchDropdown,
    setUserSearchQuery,
    hideSearchResultList,
    setLiveSearchData
} from '../../../../actions/searchAction';


const Magnifier = () => {
    return (
        <svg
            className="magnifier"
            width="22"
            height="23"
            viewBox="0 0 22 23"
            xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.51548 17.1006C13.3951 17.1006 16.5401 13.9556 16.5401 10.076C16.5401 6.19644 13.3951 3.05142 9.51548 3.05142C5.6359 3.05142 2.49087 6.19644 2.49087 10.076C2.49087 13.9556 5.6359 17.1006 9.51548 17.1006ZM9.51548 19.5212C14.7319 19.5212 18.9606 15.2924 18.9606 10.076C18.9606 4.8596 14.7319 0.630859 9.51548 0.630859C4.29906 0.630859 0.0703125 4.8596 0.0703125 10.076C0.0703125 15.2924 4.29906 19.5212 9.51548 19.5212Z"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M19.4333 22.6309L14.2025 17.4001L15.9141 15.6885L21.1448 20.9193L19.4333 22.6309Z" />
        </svg>
    );
}

const Chevron = () => {
    return (
        <svg
            className="chevron"
            width="19"
            height="12"
            viewBox="0 0 19 12"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M2.76499 11.5762L9.57876 4.77725L16.3925 11.5762L18.4856 9.48306L9.57876 0.576172L0.671875 9.48306L2.76499 11.5762Z" />
        </svg>
    );
}

export const SearchDesktop = (props) => {

    const {
        isOpen,
        toggleSearchDropdown,
        setUserSearchQuery,
        hideSearchResultList,
        path,
        setLiveSearchData,
    } = props;

    const onClickOutsideHandler = () => {
        if (isOpen) {
            toggleSearchDropdown(false);
            setUserSearchQuery('');
            hideSearchResultList(true);
        }
    };

    const transitions = useTransition(isOpen, null, {
        from: { display: 'none' },
        enter: { display: 'flex' },
        leave: { display: 'none' },
    });

    const config = { mass: 1, tension: 2000, friction: 200 };
    const trail = useTrail(1, {
        config,
        opacity: isOpen ? 1 : 0,
        height: isOpen ? 200 : 0,
        from: { opacity: 0, height: 0 },
    });

    const inputEl = useRef(null);
    const onButtonClick = () => {
        inputEl.current.focus();
    };

    return (
        <div className="search-header-desktop-wrap">
            {path !== '/search-page' && <OutsideClickHandler
                onOutsideClick={onClickOutsideHandler}
            >
                <div
                    className="search-header-block"
                >
                    <div
                        className="search-icon-container"
                        onClick={() => {
                            toggleSearchDropdown(!isOpen);
                            document.querySelector('.search-input-wrap').reset();
                            setUserSearchQuery('');
                            setLiveSearchData([]);
                            onButtonClick();
                        }}
                    >
                        {transitions.map(({props}, index) =>
                            isOpen
                            ?
                            <animated.div
                                key={index}
                                style={props}
                                className="search-header-icon"
                            >
                                <Chevron />
                            </animated.div>
                            :
                            <animated.div
                                key={index}
                                style={props}
                                className="search-header-icon"
                            >
                                <Magnifier />
                            </animated.div>
                        )}
                    </div>
                    {trail.map(({height, opacity}, index) => (
                        <animated.div
                            key={index}
                            style={{opacity, height}}
                            className="dropdown-search-block"
                        >
                            <div className="dropdown-search-container">
                                <SearchForm
                                    refProp={inputEl}
                                />
                                {/*<SearchTagsBlock />*/}
                            </div>
                        </animated.div>
                    ))}
                </div>
                <SearchResultDropdown />
            </OutsideClickHandler>}
        </div>
    )
};

SearchDesktop.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleSearchDropdown: PropTypes.func.isRequired,
    setUserSearchQuery: PropTypes.func.isRequired,
    hideSearchResultList: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    setLiveSearchData: PropTypes.func.isRequired,
};

const mapStateToProps = ({searchReducer, router}) => ({
    isOpen: searchReducer.isOpen,
    path: router.location.pathname,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    toggleSearchDropdown,
    setUserSearchQuery,
    hideSearchResultList,
    setLiveSearchData,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchDesktop);