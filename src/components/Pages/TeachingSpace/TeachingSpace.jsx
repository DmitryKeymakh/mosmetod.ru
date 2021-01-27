import React, {useEffect, useState} from 'react';
import "./_teaching-space.scss";
import axios from "axios";
import api from "../../../assets/api";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import TeachingSpaceSubcategoryList from "./TeachingSpaceSubcategoryList";
import ellipsis from './icons/ellipsis.svg'
import blueEllipsis from './icons/blue-ellipsis.svg'


function TeachingSpace() {

    const [categoriesList, setCategoriesList] = useState([]);

    const teachingSpaceCategoriesUrl = api.teachingSpaceCategories;

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const fetchData = async () => {
                const result = await axios(
                    teachingSpaceCategoriesUrl,
                );
                setCategoriesList(result.data);
            };
            fetchData();
        }
        return () => mounted = false;
    }, [teachingSpaceCategoriesUrl]);

    return (
        <>
            <div className="teaching-space-wrap">
                <Accordion className="teaching-space-category-accordion"
                           allowZeroExpanded={true}>
                    {categoriesList.map((item) => (
                        <AccordionItem
                            className="teaching-space-category-accordion-item"
                            key={item.id}>
                            <AccordionItemHeading className="teaching-space-category-accordion-heading">
                                <AccordionItemButton
                                    className="teaching-space-category-accordion-button fade-in">
                                    <div className="teaching-space-category-accordion-title">
                                            {item.title}
                                    </div>
                                    <img className="teaching-space-category-accordion-ellipsis" src={ellipsis} alt="..."/>
                                    <img className="teaching-space-category-accordion-ellipsis-blue" src={blueEllipsis} alt="..."/>
                                    <div className="teaching-space-category-accordion-line">
                                        <div className="teaching-space-category-accordion-line-up" />
                                        <div className="teaching-space-category-accordion-line-down" />
                                    </div>
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="teaching-space-category-accordion-panel">
                                <TeachingSpaceSubcategoryList
                                    category={item}/>
                            </AccordionItemPanel>
                        </AccordionItem>))}
                </Accordion>
            </div>
        </>
    )
}

export default TeachingSpace;