import React, {Suspense, useEffect, useState} from 'react';
import './_materialNewsItem.scss';
import {YMaps, Map, Placemark} from "react-yandex-maps";
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel
} from "react-accessible-accordion";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "@reach/tabs";
import Preloader from "../Preloader/Preloader";
import YouTube from 'react-youtube';
import Gallery from "../Gallery/Gallery";
import styled from 'styled-components';


function MaterialNewsItemContent(props) {
    const {data} = props;

    const alignLogo = () => {
        switch (data.banner.align) {
            case 'left':
                return 'flex-start';
            case 'center':
                return 'center';
            case 'right':
                return 'flex-end';
            default:
                return 'flex-start';
        }
    }

    const Logo = styled.div`
        display: flex;
        justify-content: ${alignLogo()};
    `;

    //const videoId = data.anchors.video.url.replace(/.*\/+/gim, '');

    /*const mapData = {
        center: [data.anchors.eventmap.coordinates[0].latitude, data.anchors.eventmap.coordinates[0].longitude],
        zoom: 11,
        controls: ['zoomControl', 'fullscreenControl'],
    };*/

    return (
        <>
            <div className="material-news-item-content">
                {
                    data.banner.length !== 0 &&
                    <Logo>
                        <a className="material-news-item-content-banner" href={data.banner.url}>
                            <img className="material-news-item-content-banner-image" src={data.banner.logo} alt="logo"/>
                        </a>
                    </Logo>
                }
                <h1 className="material-news-item-content-title" id="title">
                    {data.title}
                </h1>
                {
                    data.anchors.gallery &&
                    <div className="material-news-item-content-gallery-wrap">
                        <h3 className="material-news-item-content-header">
                            <a href="#gallery" aria-hidden="true" className="skip-link-icon"
                               id="gallery">
                                <svg aria-hidden="true" className="aal_svg" height="16" version="1.1"
                                     viewBox="0 0 16 16" width="16">
                                    <path
                                        d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"/>
                                </svg>
                            </a>
                            {data.anchors.gallery.title}
                        </h3>
                        <div className="material-news-item-content-gallery">
                            <Gallery data={data.anchors.gallery.imagesList} />
                        </div>
                    </div>
                }
                {
                    data.content &&
                    <div className="material-news-item-content-content-wrap">
                        <div className="material-news-item-content-text"
                             dangerouslySetInnerHTML={{__html: data.content}}/>
                    </div>
                }
                {
                    data.anchors.video &&
                    <div className="material-news-item-content-video-block">
                        <h3 className="material-news-item-content-header">
                            <a href="#video" aria-hidden="true" className="skip-link-icon"
                               id="video">
                                <svg aria-hidden="true" className="aal_svg" height="16" version="1.1"
                                     viewBox="0 0 16 16" width="16">
                                    <path
                                        d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"/>
                                </svg>
                            </a>
                            {data.anchors.video.title}
                        </h3>
                        <div className="material-news-item-content-video-wrap">
                            <YouTube className="material-news-item-content-video"
                                     videoId={data.anchors.video.url.replace(/.*\/+/gim, '')}/>
                            {/*<iframe className="material-news-item-content-video"
                                    src={data.anchors.video.url}
                                    frameBorder='0'
                                    allowFullScreen
                                    title={data.anchors.video.title}
                            />*/}
                        </div>
                    </div>
                }
                {
                    data.anchors.eventmap &&
                    <div className="material-news-item-content-video-block">
                        <h3 className="material-news-item-content-header">
                            <a href="#eventmap" aria-hidden="true" className="skip-link-icon"
                               id="eventmap">
                                <svg aria-hidden="true" className="aal_svg" height="16" version="1.1"
                                     viewBox="0 0 16 16" width="16">
                                    <path
                                        d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"/>
                                </svg>
                            </a>
                            {data.anchors.eventmap.title}
                        </h3>
                        <div className="material-news-item-content-map-wrap">
                            <YMaps
                                query={{
                                    ns: 'use-load-option',
                                    load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon,geoObject.addon.hint'
                                }}>
                                <Map className="material-news-item-content-map"
                                     defaultState={
                                         {
                                             center: [data.anchors.eventmap.coordinates[0].latitude, data.anchors.eventmap.coordinates[0].longitude],
                                             zoom: 11,
                                             controls: ['zoomControl', 'fullscreenControl']
                                         }
                                     }>
                                    {data.anchors.eventmap.coordinates.map(coordinate =>
                                        <Placemark
                                            key={coordinate.id}
                                            geometry={[coordinate.latitude, coordinate.longitude]}
                                            properties={{
                                                balloonContentHeader: coordinate.placeTitle,
                                                balloonContentBody: coordinate.address,
                                                /*balloonContentFooter: "Тест тест",*/
                                            }}
                                        />
                                    )}
                                </Map>
                            </YMaps>
                        </div>
                    </div>
                }
                {
                    data.anchors.tabs &&
                    <div className="material-news-item-content-tabs-wrap">
                        <h3 className="material-news-item-content-header">
                            <a href="#tabs" aria-hidden="true" className="skip-link-icon"
                               id="tabs">
                                <svg aria-hidden="true" className="aal_svg" height="16" version="1.1"
                                     viewBox="0 0 16 16" width="16">
                                    <path
                                        d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"/>
                                </svg>
                            </a>
                            {data.anchors.tabs.title}
                        </h3>
                        <div className="material-news-item-content-tabs-wrap">
                            <Tabs className="material-news-item-content-tabs">
                                <TabList className="material-news-item-content-tabs-tablist">
                                    {data.anchors.tabs.items.map((tab) => (
                                        <Tab className="material-news-item-content-tabs-tab"
                                             as="div"
                                             key={tab.id}>
                                            <div
                                                className="material-news-item-content-tabs-tabtitle">{tab.tabsTitle}</div>
                                        </Tab>))}
                                </TabList>
                                <TabPanels className="material-news-item-content-tabs-tabpanels">
                                    {data.anchors.tabs.items.map((tab) => (
                                        <TabPanel className="material-news-item-content-tabs-tabpanel fade-in"
                                                  key={tab.id}>
                                            <Suspense fallback={<Preloader/>}>
                                                <div className="material-news-item-content-tabs-tabcontent"
                                                     dangerouslySetInnerHTML={{__html: tab.tabsContent}}/>
                                            </Suspense>
                                        </TabPanel>
                                    ))}
                                </TabPanels>
                            </Tabs>
                        </div>
                    </div>
                }
                {
                    data.anchors.accordion &&
                    <div className="material-news-item-content-tabs-wrap">
                        <h3 className="material-news-item-content-header">
                            <a href="#accordion" aria-hidden="true" className="skip-link-icon"
                               id="accordion">
                                <svg aria-hidden="true" className="aal_svg" height="16" version="1.1"
                                     viewBox="0 0 16 16" width="16">
                                    <path
                                        d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"/>
                                </svg>
                            </a>
                            {data.anchors.accordion.title}
                        </h3>
                        <div className="material-news-item-content-accordion-wrap">
                            <Accordion className="material-news-item-content-accordion"
                                       allowZeroExpanded={true}>
                                {data.anchors.accordion.items.map((item) => (
                                    <AccordionItem
                                        className="material-news-item-content-accordion-item"
                                        key={item.id}>
                                        <AccordionItemHeading className="material-news-item-content-accordion-heading">
                                            <AccordionItemButton
                                                className="material-news-item-content-accordion-button-block">
                                                <div className="material-news-item-content-accordion-button">
                                                    <div className="material-news-item-content-accordion-title">
                                                        {item.accordionTitle}
                                                    </div>
                                                    <div className="material-news-item-content-accordion-button-img" />
                                                    {/*<img className="material-news-item-content-accordion-arrow"
                                                         src={accordionArrow}
                                                         alt="+"/>
                                                    <img className="material-news-item-content-accordion-arrow"
                                                         src={dropDownArrow}
                                                         alt="+"/>*/}
                                                </div>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel className="material-news-item-content-accordion-panel">
                                            <div className="material-news-item-content-accordion-content"
                                                 dangerouslySetInnerHTML={{__html: item.accordionContent}}/>
                                        </AccordionItemPanel>
                                    </AccordionItem>))}
                            </Accordion>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default MaterialNewsItemContent;