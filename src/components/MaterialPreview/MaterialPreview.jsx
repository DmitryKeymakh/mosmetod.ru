import React, {useEffect, useState} from 'react';
import '../MaterialNewsContent/_materialNewsItem.scss';
import MaterialNewsItemContent from "../MaterialNewsContent/MaterialNewsItemContent";
import MaterialNewsItemSideBar from "../MaterialNewsContent/MaterialNewsItemSideBar";
import api from "../../assets/api";
import axios from "axios";


function MaterialPreview(props) {

    const itemId = parseInt(props.match.params.id, 10);
    const itemType = parseInt(props.match.params.type, 10);
    const itemGuid = props.match.params.guid;
    const itemPath = props.match.path;

    const [materialItem, setMaterialItem] = useState({
        id: 31833,
        title: '',
        banner: {},
        content: '',
        author: {},
        category: {},
        publication: '',
        anchors: {}
    });

    const itemUrl = api.materialItemPreview;

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const fetchData = async () => {
                const result = await axios(
                    `${itemUrl}?id=${itemId}&type=${itemType}&guid=${itemGuid}`,
                );
                setMaterialItem(result.data);
            };
            fetchData();
        }
        return () => mounted = false;
    }, []);

    return (
        <>
            <div className="material-news-item-main-wrap">
                <MaterialNewsItemContent
                    data={materialItem}/>
                <MaterialNewsItemSideBar
                    path={itemPath}
                    data={materialItem}/>
            </div>
        </>
    )
}

export default MaterialPreview;