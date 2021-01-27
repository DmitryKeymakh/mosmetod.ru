import React, {useEffect, useState} from 'react';
import './_materialNewsItem.scss';
import api from "../../assets/api";
import axios from "axios";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import Error404 from "../Pages/Error404/Error404";

const MaterialNewsItemContent = React.lazy(() => import('./MaterialNewsItemContent'));
const MaterialNewsItemSideBar = React.lazy(() => import('./MaterialNewsItemSideBar'));


const MaterialNewsItem = (props) => {

    const itemId = parseInt(props.match.params.id, 10);

    const [materialItem, setMaterialItem] = useState({
        id: null,
        title: '',
        banner: {},
        content: '',
        author: {},
        category: {},
        publication: '',
        anchors: {},
    });

    const [isError, setIsError] = useState(false);

    const itemUrl = api.materialItem;

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const fetchData = async () => {
                try {
                    const result = await axios(
                        `${itemUrl}?id=${itemId}`,
                    );
                    setMaterialItem(result.data);
                } catch (error) {
                    setIsError(true);
                }
            };
            fetchData();
        }
        return () => mounted = false;
    }, [itemId]);


    return isError
        ?
        <Error404/>
        :
        <div className="material-news-item-main-wrap">
            <MaterialNewsItemContent
                data={materialItem}/>
            <MaterialNewsItemSideBar
                data={materialItem}/>
        </div>
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MaterialNewsItem);