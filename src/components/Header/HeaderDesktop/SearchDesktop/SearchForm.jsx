import './_search-desktop.scss'
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import PropTypes from "prop-types";
import {push} from 'connected-react-router';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {
    setUserSearchQuery,
    // hideSearchResultList,
    setLiveSearchUrl,
    setSearchPageUrl,
    toggleSearchDropdown,
    setSearchPageStringsQuantityUrl,
    setRadioSiteFilter,
    setRadioTimeFilter,
    setCursor,
    hideSearchResultList,
} from '../../../../actions/searchAction';


const Magnifier = () => {
    return (
        <svg
            className="magnifier-search-form"
            width="22"
            height="22"
            viewBox="0 0 22 23"
            xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.51548 17.1006C13.3951 17.1006 16.5401 13.9556 16.5401 10.076C16.5401 6.19644 13.3951 3.05142 9.51548 3.05142C5.6359 3.05142 2.49087 6.19644 2.49087 10.076C2.49087 13.9556 5.6359 17.1006 9.51548 17.1006ZM9.51548 19.5212C14.7319 19.5212 18.9606 15.2924 18.9606 10.076C18.9606 4.8596 14.7319 0.630859 9.51548 0.630859C4.29906 0.630859 0.0703125 4.8596 0.0703125 10.076C0.0703125 15.2924 4.29906 19.5212 9.51548 19.5212Z"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M19.4333 22.6309L14.2025 17.4001L15.9141 15.6885L21.1448 20.9193L19.4333 22.6309Z" />
        </svg>
    );
}

export const SearchForm = (props) => {

    const {
        refProp,
        query,
        setUserSearchQuery,
        setLiveSearchUrl,
        push,
        setSearchPageUrl,
        toggleSearchDropdown,
        setSearchPageStringsQuantityUrl,
        setRadioSiteFilter,
        setRadioTimeFilter,
        liveSearchData,
        setCursor,
        cursor,
        hideSearchResultList,
        isOpen,
    } = props;


    const [inputText, setInputText] = useState(query);
    const changeHandler = (event) => {
        setUserSearchQuery(event.target.value);
        setLiveSearchUrl(`/search?search=${event.target.value.trim()}`);
        setInputText(event.target.value);
        if (!event.target.value) setCursor(-1);
    }

    const submitHandler = (event) => {
        event.preventDefault();
    }

    const handleNavigate = (link) => {
        push(link);
        setSearchPageUrl(link);
        toggleSearchDropdown(false);
        setSearchPageStringsQuantityUrl(link);
        setRadioSiteFilter('site');
        setRadioTimeFilter('all');
        setCursor(-1);
    };

    let history = useHistory();

    const handleEnter = () => {
        if (cursor < 0) {
            history.push('/search-page');
        } else if (!liveSearchData[cursor].id) {
            window.open(liveSearchData[cursor].url,'_blank');
        } else {
            history.push(`/documents/${liveSearchData[cursor].id}`);
        }
    }

    const arrayUpHandler = () => {
        if (liveSearchData) {
            setCursor(cursor - 1);
            document.cursor && (document.style.cursor = 'none');
            if (cursor > 0) {
                setUserSearchQuery(liveSearchData[cursor - 1].title);
            } else {
                setUserSearchQuery(inputText);
                setCursor(liveSearchData.length);
            }
        }
    }

    const arrayDownHandler = () => {
        if (liveSearchData) {
            setCursor(cursor + 1);
            document.cursor && (document.style.cursor = 'none');
            if (cursor < liveSearchData.length - 1) {
                setUserSearchQuery(liveSearchData[cursor + 1].title);
            } else {
                setUserSearchQuery(inputText);
                setCursor(-1);
            }
        }
    }

    const keyEscapeHandler = () => {
        toggleSearchDropdown(false);
        setUserSearchQuery('');
        hideSearchResultList(true);
        setCursor(-1);
    }

    const keyUpHandler = (event) => {
        const keyCode = event.keyCode;

        switch(keyCode) {
            case 13:
                handleNavigate(`?search=${query}&site=site&time=all&page=1&count=20`);
                handleEnter();
                break;
            case 38:
                arrayUpHandler();
                break
            case 40:
                arrayDownHandler();
                break
            case 27:
                keyEscapeHandler();
                break
        }
    };

    return (
        <form
            className="search-input-wrap"
            onSubmit={submitHandler}
        >
            <input
                className="search-input"
                aria-label="search"
                ref={refProp}
                name="search"
                type="search"
                placeholder="Поиск"
                autoComplete="off"
                onChange={changeHandler}
                value={query}
                onKeyUp={(event) => {
                    keyUpHandler(event);
                }}
            />
            {isOpen && <Link
                className="search-page-submit"
                type="submit"
                // to={`/search-page?search=${query}&site=site&time=all&page=1&count=20`}
                to={`/search-page`}
                onClick={() => handleNavigate(`?search=${query}&site=site&time=all&page=1&count=20`)}
            >
                <span className="button-search-form">
                    Найти
                </span>
                <Magnifier/>
            </Link>}
        </form>
    );
};

SearchForm.propTypes = {
    query: PropTypes.string.isRequired,
    setUserSearchQuery: PropTypes.func.isRequired,
    setLiveSearchUrl: PropTypes.func.isRequired,
    // hideSearchResultList: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    setSearchPageUrl: PropTypes.func.isRequired,
    toggleSearchDropdown: PropTypes.func.isRequired,
    setSearchPageStringsQuantityUrl: PropTypes.func.isRequired,
    setRadioSiteFilter: PropTypes.func.isRequired,
    setRadioTimeFilter: PropTypes.func.isRequired,
    liveSearchData: PropTypes.array.isRequired,
    setCursor: PropTypes.func.isRequired,
    cursor: PropTypes.number.isRequired,
    hideSearchResultList: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = ({searchReducer}) => ({
    liveSearchData: searchReducer.liveSearchData,
    query: searchReducer.query,
    cursor: searchReducer.cursor,
    isOpen: searchReducer.isOpen,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setUserSearchQuery,
    // hideSearchResultList,
    setLiveSearchUrl,
    push,
    setSearchPageUrl,
    toggleSearchDropdown,
    setSearchPageStringsQuantityUrl,
    setRadioSiteFilter,
    setRadioTimeFilter,
    setCursor,
    hideSearchResultList,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchForm);