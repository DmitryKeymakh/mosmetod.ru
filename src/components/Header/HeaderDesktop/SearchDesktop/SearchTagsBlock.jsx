import './_search-desktop.scss';
import api from "../../../../assets/api";
import React, {useEffect} from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {setTagsList} from "../../../../actions/navigationAction";


export const SearchTagsBlock = (props) => {

    const {tagsList, setTagsList} = props;

    const url = api.searchTags;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                url,
            );
            setTagsList(result.data);
        };
        fetchData();
    }, [url]);

    return(
        <>
            {tagsList && <div className="search-tags-block">
                {tagsList.map(item => {
                    return (
                        <a
                            className="search-tag"
                            key={item.id}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {item.title}
                        </a>
                    );
                })}
            </div>}
        </>
    )
}

SearchTagsBlock.propTypes = {
    tagsList: PropTypes.array.isRequired,
    setTagsList: PropTypes.func.isRequired,
};

const mapStateToProps = ({navigationReducer}) => ({
    tagsList: navigationReducer.tagsList,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setTagsList,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchTagsBlock);