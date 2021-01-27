import React, {useEffect, useState} from 'react';
import "./_teaching-space.scss";
import axios from "axios";
import {NavLink} from "react-router-dom";
import api from "../../../assets/api";


function TeachingSpaceSubcategoryList(props) {

    const {category} = props;

    const [subcategoriesList, setSubcategoriesList] = useState([]);

    const teachingSpaceSubcategoriesUrl = `${api.teachingSpaceSubcategories}?id=${category.id}`;

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const fetchData = async () => {
                const result = await axios(
                    teachingSpaceSubcategoriesUrl,
                );
                setSubcategoriesList(result.data);
            };
            fetchData();
        }
        return () => mounted = false;
    }, [teachingSpaceSubcategoriesUrl]);

    return (
        <>
            <div className="teaching-space-subcategory-wrap">
                <ul className="teaching-space-subcategory-block">
                    {
                        subcategoriesList.length > 0 ?
                            subcategoriesList.map((item) =>
                                <li className="teaching-space-subcategory-item"
                                    key={item.id}>
                                    <NavLink key={item.id}
                                             to={`/teaching-space/${item.id}`}>
                                        {item.title}
                                    </NavLink>
                                </li>
                            ) :
                            <NavLink className="teaching-space-subcategory-item"
                                     to={`/teaching-space/${category.id}`}>
                                {category.title}
                            </NavLink>
                    }
                </ul>
            </div>
        </>
    )
}

export default TeachingSpaceSubcategoryList;