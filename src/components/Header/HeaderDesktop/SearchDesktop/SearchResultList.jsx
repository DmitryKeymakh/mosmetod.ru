import './_search-desktop.scss';
import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import axios from 'axios';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {
    setLiveSearchData,
    toggleSearchDropdown,
    setUserSearchQuery,
} from '../../../../actions/searchAction';


export const SearchResultList = (props) => {

    const {
        isOpen,
        query,
        liveSearchUrl,
        liveSearchData,
        setLiveSearchData,
        toggleSearchDropdown,
        setUserSearchQuery,
        cursor,
    } = props;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                liveSearchUrl,
            );
            setLiveSearchData(result.data);
        };

        query.length >= 3 ? fetchData() : setLiveSearchData([]);

    }, [liveSearchUrl]);

    const Material = (props) => {

        const {data} = props;

        return (
            <Link
                className="search-result-link"
                to={`/documents/${data.id}`}
                onClick={() => {
                    toggleSearchDropdown(false);
                    setUserSearchQuery('');
                }}
            >
                <div
                    className="search-result-link-title"
                >
                    {data.title}
                </div>
                {data.description && <div
                    className="search-result-link-description"
                >
                    {data.description}
                </div>}
            </Link>
        )
    }

    const Project = (props) => {

        const {data} = props;

        return (
            <a
                className="search-result-link"
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                // onClick={() => {
                    // toggleSearchDropdown(false);
                    // setUserSearchQuery('');
                // }}
            >
                {data.logo && <img
                    className="search-result-link-image"
                    loading="lazy"
                    src={data.logo}
                    alt='logo'
                />}
                <div
                    className="search-result-link-title"
                >
                    {data.title}
                </div>
                {data.description && <div
                    className="search-result-link-description"
                >
                    {data.description}
                </div>}
            </a>
        )
    }

    return(
        <>
            {isOpen && liveSearchData.length > 0 &&
            <div className="search-result-dropdown">
                <ul className="search-result-list">
                    {liveSearchData.map((item, id) => {
                        return (
                            <li
                                key={id}
                                className={cursor === id ? 'search-result-item search-result-link-active' : 'search-result-item'}
                            >
                                {
                                    item.id
                                    ?
                                    <Material data={item} />
                                    :
                                    <Project data={item} />
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>}
        </>
    )
};

SearchResultList.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    query: PropTypes.string.isRequired,
    liveSearchUrl: PropTypes.string.isRequired,
    liveSearchData: PropTypes.array.isRequired,
    setLiveSearchData: PropTypes.func.isRequired,
    toggleSearchDropdown: PropTypes.func.isRequired,
    setUserSearchQuery: PropTypes.func.isRequired,
    cursor: PropTypes.number.isRequired,
};

const mapStateToProps = ({searchReducer}) => ({
    isOpen: searchReducer.isOpen,
    query: searchReducer.query,
    liveSearchUrl: searchReducer.liveSearchUrl,
    liveSearchData: searchReducer.liveSearchData,
    cursor: searchReducer.cursor,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setLiveSearchData,
    toggleSearchDropdown,
    setUserSearchQuery,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchResultList);