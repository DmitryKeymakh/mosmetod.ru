import './_search-mobile.scss';
import React, {useRef} from 'react';
import {useTrail, animated} from 'react-spring';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {
    toggleBurgerMenu,
} from '../../../../actions/navigationAction';
import {
    toggleSearchDropdown,
    setUserSearchQuery,
    hideSearchResultList,
    setLiveSearchData,
} from '../../../../actions/searchAction';
import SearchForm from "../../HeaderDesktop/SearchDesktop/SearchForm";
import SearchResultList from "../../HeaderDesktop/SearchDesktop/SearchResultList";


const Magnifier = () => {
    return (
        <svg
            className="magnifier"
            width="22"
            height="22"
            viewBox="0 0 22 23"
            xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.51548 17.1006C13.3951 17.1006 16.5401 13.9556 16.5401 10.076C16.5401 6.19644 13.3951 3.05142 9.51548 3.05142C5.6359 3.05142 2.49087 6.19644 2.49087 10.076C2.49087 13.9556 5.6359 17.1006 9.51548 17.1006ZM9.51548 19.5212C14.7319 19.5212 18.9606 15.2924 18.9606 10.076C18.9606 4.8596 14.7319 0.630859 9.51548 0.630859C4.29906 0.630859 0.0703125 4.8596 0.0703125 10.076C0.0703125 15.2924 4.29906 19.5212 9.51548 19.5212Z"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M19.4333 22.6309L14.2025 17.4001L15.9141 15.6885L21.1448 20.9193L19.4333 22.6309Z" />
        </svg>
    );
}

const CrossIcon = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.6605 2.68325L21.3105 0.333252L11.9938 9.64992L2.67715 0.333252L0.327148 2.68325L9.64382 11.9999L0.327148 21.3166L2.67715 23.6666L11.9938 14.3499L21.3105 23.6666L23.6605 21.3166L14.3438 11.9999L23.6605 2.68325Z"/>
        </svg>
    )
}

export const SearchMobile = (props) => {

    const {isOpen, toggleSearchDropdown, setUserSearchQuery, hideSearchResultList, path, setLiveSearchData, toggleBurgerMenu} = props;

    const onClickOutsideHandler = () => {
        if (isOpen) {
            toggleSearchDropdown(false);
            document.querySelector('.search-input-wrap').reset();
            setUserSearchQuery('');
            hideSearchResultList(false);
        }
    };

    const config = { mass: 1, tension: 2000, friction: 200 };
    const trail = useTrail(1, {
        config,
        opacity: isOpen ? 1 : 0,
        width: isOpen ? '100%' : '0%',
        from: {opacity: 0, width: '0%'},
    });

    const inputEl = useRef(null);
    const onButtonClick = () => {
        inputEl.current.focus();
    };

    return (
        <div className="search-mobile-wrap">
            {path !== '/search-page' && <OutsideClickHandler
                onOutsideClick={onClickOutsideHandler}
            >
                <div
                    className="search-mobile-icon"
                    onClick={() => {
                        toggleBurgerMenu(false);
                        toggleSearchDropdown(true);
                        setLiveSearchData([]);
                        setUserSearchQuery('');
                        onButtonClick();
                    }}
                >
                    <Magnifier />
                </div>
                {trail.map(({width, opacity}, index) => (
                    <animated.div
                        key={index}
                        style={{opacity, width}}
                        className="search-mobile-dropdown-block container"
                    >
                        <SearchForm
                            refProp={inputEl}
                        />
                        {isOpen && <div
                            className="search-mobile-icon"
                            onClick={() => {
                                toggleSearchDropdown(false);
                                setUserSearchQuery('');
                            }}
                        >
                            <CrossIcon/>
                        </div>}
                    </animated.div>
                ))}
                <SearchResultList/>
            </OutsideClickHandler>}
        </div>
    )

};

SearchMobile.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleSearchDropdown: PropTypes.func.isRequired,
    setUserSearchQuery: PropTypes.func.isRequired,
    hideSearchResultList: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    setLiveSearchData: PropTypes.func.isRequired,
    toggleBurgerMenu: PropTypes.func.isRequired,
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
    toggleBurgerMenu,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchMobile);

