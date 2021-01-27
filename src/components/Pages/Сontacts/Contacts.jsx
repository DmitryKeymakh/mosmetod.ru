import './_contacts.scss';
import React from 'react';
import PropTypes from "prop-types";
import ContactsItem from "./ContactsItem";
import ContactsAddressItem from "./ContactsAddressItem";
import {YMaps, Map, Placemark} from "react-yandex-maps";
import BlocksHeader from "../Home/BlocksHeader/BlocksHeader";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";


const Management = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50%"
            height="65"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-users"
        >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2">
            </path>
            <circle cx="9" cy="7" r="4">
            </circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87">
            </path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75">
            </path>
        </svg>
    )
}

const Email = () => {
    return (
        <svg width="50%" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6667 11.6667H58.3334C61.5417 11.6667 64.1667 14.2917 64.1667 17.5001V52.5001C64.1667 55.7084 61.5417 58.3334 58.3334 58.3334H11.6667C8.45837 58.3334 5.83337 55.7084 5.83337 52.5001V17.5001C5.83337 14.2917 8.45837 11.6667 11.6667 11.6667Z" stroke="#ECF0F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M64.1667 17.5L35 37.9167L5.83337 17.5" stroke="#ECF0F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const Phone = () => {
    return (
        <svg width="50%" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M64.1668 49.35V58.1C64.1701 58.9123 64.0037 59.7163 63.6783 60.4606C63.3528 61.2048 62.8756 61.8729 62.277 62.4221C61.6784 62.9712 60.9718 63.3893 60.2023 63.6495C59.4328 63.9098 58.6174 64.0064 57.8084 63.9333C48.8334 62.9581 40.2122 59.8912 32.6376 54.9791C25.5904 50.5011 19.6157 44.5263 15.1376 37.4791C10.2084 29.8701 7.14081 21.207 6.18343 12.1916C6.11055 11.3851 6.2064 10.5722 6.46489 9.8047C6.72338 9.03722 7.13885 8.33197 7.68483 7.73385C8.23082 7.13574 8.89536 6.65786 9.63616 6.33065C10.3769 6.00343 11.1778 5.83405 11.9876 5.83329H20.7376C22.1531 5.81936 23.5253 6.3206 24.5986 7.24359C25.6718 8.16659 26.3728 9.44834 26.5709 10.85C26.9403 13.6502 27.6252 16.3996 28.6126 19.0458C29.005 20.0897 29.0899 21.2243 28.8573 22.315C28.6247 23.4058 28.0843 24.4069 27.3001 25.2L23.5959 28.9041C27.748 36.2061 33.7939 42.2521 41.0959 46.4041L44.8001 42.7C45.5931 41.9158 46.5943 41.3754 47.685 41.1427C48.7758 40.9101 49.9103 40.995 50.9543 41.3875C53.6005 42.3749 56.3499 43.0598 59.1501 43.4291C60.5669 43.629 61.8609 44.3426 62.7858 45.4343C63.7108 46.526 64.2023 47.9196 64.1668 49.35Z" stroke="#ECF0F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const YouTube = () => {
    return (
        <svg width="50%" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M65.7416 18.7251C65.3951 17.3409 64.6895 16.0726 63.696 15.0483C62.7025 14.0241 61.4563 13.2802 60.0833 12.8917C55.0666 11.6667 34.9999 11.6667 34.9999 11.6667C34.9999 11.6667 14.9333 11.6667 9.91658 13.0084C8.54356 13.3969 7.29735 14.1408 6.30385 15.165C5.31034 16.1892 4.60472 17.4575 4.25825 18.8417C3.34013 23.933 2.89102 29.0976 2.91658 34.2709C2.88386 39.4831 3.33299 44.6872 4.25825 49.8167C4.64022 51.158 5.36165 52.378 6.35284 53.359C7.34403 54.3399 8.57148 55.0487 9.91658 55.4167C14.9333 56.7584 34.9999 56.7584 34.9999 56.7584C34.9999 56.7584 55.0666 56.7584 60.0833 55.4167C61.4563 55.0283 62.7025 54.2844 63.696 53.2601C64.6895 52.2359 65.3951 50.9676 65.7416 49.5834C66.6526 44.5305 67.1017 39.4052 67.0833 34.2709C67.116 29.0587 66.9253 24.6297 66 19.5001L65.7416 18.7251Z" stroke="#ECF0F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M28.4375 43.8084L45.2083 34.2709L28.4375 24.7334V43.8084Z" stroke="#ECF0F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const Vk = () => {
    return (
        <svg width="50%" height="95" viewBox="0 0 164 95" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M79.3247 91.6274H88.6494C88.6494 91.6274 91.4661 91.3182 92.904 89.7678C94.2277 88.3446 94.1853 85.6718 94.1853 85.6718C94.1853 85.6718 94.0032 73.1592 99.8102 71.3166C105.535 69.5015 112.886 83.4099 120.677 88.7576C126.569 92.8049 131.046 91.9175 131.046 91.9175L151.879 91.6274C151.879 91.6274 162.777 90.956 157.609 82.3869C157.186 81.6859 154.6 76.048 142.12 64.463C129.057 52.338 130.806 54.2992 146.542 33.3255C156.125 20.5523 159.956 12.7542 158.759 9.4142C157.618 6.2331 150.57 7.07391 150.57 7.07391L127.113 7.22005C127.113 7.22005 125.374 6.98284 124.085 7.75376C122.824 8.50985 122.013 10.272 122.013 10.272C122.013 10.272 118.301 20.1563 113.349 28.5623C102.904 46.2998 98.728 47.2359 97.0211 46.1346C93.0502 43.5677 94.0413 35.8225 94.0413 30.3201C94.0413 13.1311 96.6483 5.96413 88.9649 4.10884C86.4151 3.49252 84.5387 3.08588 78.018 3.02023C69.6484 2.93339 62.5643 3.04564 58.5532 5.01106C55.8848 6.31782 53.8263 9.22995 55.08 9.39726C56.6302 9.60482 60.1416 10.344 62.0031 12.8791C64.4068 16.1492 64.3221 23.4941 64.3221 23.4941C64.3221 23.4941 65.7029 43.7286 61.0967 46.2426C57.9348 47.9666 53.5975 44.4466 44.2855 28.3547C39.5141 20.1118 35.9117 11.0005 35.9117 11.0005C35.9117 11.0005 35.2171 9.29772 33.9782 8.38701C32.4745 7.28358 30.3737 6.93202 30.3737 6.93202L8.08373 7.07814C8.08373 7.07814 4.73759 7.17134 3.50926 8.62635C2.41648 9.92039 3.42243 12.5974 3.42243 12.5974C3.42243 12.5974 20.8732 53.4266 40.6323 74.0021C58.7502 92.8664 79.3247 91.6274 79.3247 91.6274Z" stroke="#ECF0F1" strokeWidth="7"/>
        </svg>
    );
}

const Facebook = () => {
    return (
        <svg width="50%" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M52.5 5.83325H43.75C39.8823 5.83325 36.1729 7.36971 33.438 10.1046C30.7031 12.8395 29.1667 16.5488 29.1667 20.4166V29.1666H20.4167V40.8333H29.1667V64.1666H40.8333V40.8333H49.5833L52.5 29.1666H40.8333V20.4166C40.8333 19.643 41.1406 18.9012 41.6876 18.3542C42.2346 17.8072 42.9765 17.4999 43.75 17.4999H52.5V5.83325Z" stroke="#ECF0F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const Instagram = () => {
    return (
        <svg width="50%" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M49.5833 5.83325H20.4167C12.3625 5.83325 5.83334 12.3624 5.83334 20.4166V49.5833C5.83334 57.6374 12.3625 64.1666 20.4167 64.1666H49.5833C57.6375 64.1666 64.1667 57.6374 64.1667 49.5833V20.4166C64.1667 12.3624 57.6375 5.83325 49.5833 5.83325Z" stroke="#ECF0F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M46.6666 33.1626C47.0265 35.59 46.6119 38.0691 45.4817 40.2473C44.3515 42.4254 42.5632 44.1918 40.3713 45.295C38.1794 46.3983 35.6954 46.7823 33.2726 46.3925C30.8498 46.0026 28.6117 44.8587 26.8765 43.1235C25.1413 41.3883 23.9975 39.1502 23.6076 36.7274C23.2177 34.3047 23.6018 31.8207 24.705 29.6287C25.8083 27.4368 27.5746 25.6486 29.7528 24.5184C31.9309 23.3881 34.41 22.9735 36.8374 23.3335C39.3134 23.7006 41.6057 24.8544 43.3757 26.6244C45.1456 28.3943 46.2994 30.6866 46.6666 33.1626Z" stroke="#ECF0F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M51.0417 18.9583H51.0708" stroke="#ECF0F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const socialItemsData = [
    {
        "title": "ПЕРСОНАЛ",
        "contact": "",
        "to": "/about-the-center/staff",
        "link": true,
        "description": "Персонал",
        "logo": <Management />,
        "gradient": {
            "start": "#67baec",
            "finish": "#095b8b"
        }
    },
    {
        "title": "E-MAIL",
        "contact": "mailto:gmc@edu.mos.ru",
        "link": false,
        "description": "E-mail",
        "logo": <Email />,
        "gradient": {
            "start": "#00B08E",
            "finish": "#00777D"
        }
    },
    {
        "title": "ТЕЛЕФОН",
        "contact": "tel:+74959126337",
        "link": false,
        "description": "8 (495) 912-63-37",
        "logo": <Phone />,
        "gradient": {
            "start": "#27AE60",
            "finish": "#007047"
        }
    },
    {
        "title": "YOUTUBE",
        "contact": "https://www.youtube.com/user/mosmetod",
        "link": true,
        "description": "YouTube",
        "logo": <YouTube />,
        "gradient": {
            "start": "#F35646",
            "finish": "#9A182F"
        }
    },
    {
        "title": "VK",
        "contact": "https://vk.com/mosmetod",
        "link": true,
        "description": "ВКонтакте",
        "logo": <Vk />,
        "gradient": {
            "start": "#05C9D9",
            "finish": "#015BDA"
        }
    },
    {
        "title": "FACEBOOK",
        "contact": "https://www.facebook.com/mosmetod",
        "link": true,
        "description": "Facebook",
        "logo": <Facebook />,
        "gradient": {
            "start": "#3498DB",
            "finish": "#3445DB"
        }
    },
    {
        "title": "INSTAGRAM",
        "contact": "https://www.instagram.com/mosmetod/",
        "link": true,
        "description": "Instagram",
        "logo": <Instagram />,
        "gradient": {
            "start": "#DA5353",
            "finish": "#F99500"
        }
    },
]


const MapPin = () => {
    return (
        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 7.66675C14 12.3334 8 16.3334 8 16.3334C8 16.3334 2 12.3334 2 7.66675C2 6.07545 2.63214 4.54933 3.75736 3.42411C4.88258 2.29889 6.4087 1.66675 8 1.66675C9.5913 1.66675 11.1174 2.29889 12.2426 3.42411C13.3679 4.54933 14 6.07545 14 7.66675Z" stroke="black" strokeOpacity="0.54" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 9.66675C9.10457 9.66675 10 8.77132 10 7.66675C10 6.56218 9.10457 5.66675 8 5.66675C6.89543 5.66675 6 6.56218 6 7.66675C6 8.77132 6.89543 9.66675 8 9.66675Z" stroke="black" strokeOpacity="0.54" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const HomePin = () => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 5.99992L8 1.33325L14 5.99992V13.3333C14 13.6869 13.8595 14.026 13.6095 14.2761C13.3594 14.5261 13.0203 14.6666 12.6667 14.6666H3.33333C2.97971 14.6666 2.64057 14.5261 2.39052 14.2761C2.14048 14.026 2 13.6869 2 13.3333V5.99992Z" stroke="#6E6E6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 14.6667V8H10V14.6667" stroke="#6E6E6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const PhonePin = () => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6667 11.28V13.28C14.6674 13.4657 14.6294 13.6494 14.555 13.8195C14.4806 13.9897 14.3715 14.1424 14.2347 14.2679C14.0979 14.3934 13.9364 14.489 13.7605 14.5485C13.5846 14.6079 13.3983 14.63 13.2133 14.6133C11.1619 14.3904 9.19134 13.6894 7.46001 12.5667C5.84923 11.5431 4.48356 10.1774 3.46001 8.56665C2.33333 6.82745 1.63217 4.84731 1.41334 2.78665C1.39668 2.60229 1.41859 2.41649 1.47767 2.24107C1.53676 2.06564 1.63172 1.90444 1.75652 1.76773C1.88131 1.63102 2.03321 1.52179 2.20253 1.447C2.37186 1.37221 2.5549 1.33349 2.74001 1.33332H4.74001C5.06354 1.33013 5.3772 1.4447 5.62251 1.65567C5.86783 1.86664 6.02806 2.15961 6.07334 2.47998C6.15775 3.12003 6.31431 3.74847 6.54001 4.35332C6.6297 4.59193 6.64911 4.85126 6.59594 5.10057C6.54277 5.34988 6.41925 5.57872 6.24001 5.75998L5.39334 6.60665C6.34238 8.27568 7.72431 9.65761 9.39334 10.6067L10.24 9.75998C10.4213 9.58074 10.6501 9.45722 10.8994 9.40405C11.1487 9.35088 11.4081 9.37029 11.6467 9.45998C12.2515 9.68568 12.88 9.84224 13.52 9.92665C13.8439 9.97234 14.1396 10.1355 14.351 10.385C14.5624 10.6345 14.6748 10.953 14.6667 11.28Z" stroke="#6E6E6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const MailPin = () => {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.66665 2.66675H13.3333C14.0666 2.66675 14.6666 3.26675 14.6666 4.00008V12.0001C14.6666 12.7334 14.0666 13.3334 13.3333 13.3334H2.66665C1.93331 13.3334 1.33331 12.7334 1.33331 12.0001V4.00008C1.33331 3.26675 1.93331 2.66675 2.66665 2.66675Z" stroke="#6E6E6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14.6666 4L7.99998 8.66667L1.33331 4" stroke="#6E6E6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

const addressData = [
    {
        "title": "Адреса зданий",
        "list": [
            {
                "text": "Воронцовская улица 6а, строение 1",
                "logo": <MapPin />,
                "email": false
            },
            {
                "text": "Малая Семеновская улица, 15",
                "logo": <MapPin />,
                "email": false
            },
            {
                "text": "Товарищеский переулок, 22",
                "logo": <MapPin />,
                "email": false
            }
        ]
    },
    {
        "title": "Учебная часть, выдача удостоверений ГМЦ",
        "list": [
            {
                "text": "Воронцовская улица 6а, строение 1",
                "logo": <MapPin />,
                "email": false
            },
            {
                "text": "Кабинет № 104",
                "logo": <HomePin />,
                "email": false
            },
            {
                "text": "+7 (495) 912-63-37, доб. 102",
                "logo": <PhonePin />,
                "email": false
            },
            {
                "text": "kursygmc@mosmetod.ru",
                "logo": <MailPin />,
                "email": true
            }
        ]
    },
    {
        "title": "Дистанционные курсы ГМЦ",
        "list": [
            {
                "text": "Воронцовская улица 6а, строение 1",
                "logo": <MapPin />,
                "email": false
            },
            {
                "text": "Кабинет № 104",
                "logo": <HomePin />,
                "email": false
            },
            {
                "text": "+7 (495) 912-63-37, доб. 102",
                "logo": <PhonePin />,
                "email": false
            },
            {
                "text": "learn@mosmetod.ru",
                "logo": <MailPin />,
                "email": true
            }
        ]
    },
]


const mapData = [
    {
        coordinates: [55.743187, 37.665190],
        hintContent: "Товарищеский переулок, 22"
    },
    {
        coordinates: [55.739405, 37.655517],
        hintContent: "Воронцовская улица 6а, строение 1"
    },
    {
        coordinates: [55.786340, 37.713733],
        hintContent: "Малая Семеновская улица, 15"
    },
]

export const Contacts = (props) => {

    const {userWidth} = props;

    return(
        <div className="contacts-page">
            <BlocksHeader
                blockName="Контакты"
            />
            <h3 className="contacts-page-header">
                Наши контакты
            </h3>
            <div className="contacts-items-wrap">
                {socialItemsData.map(item =>
                    <ContactsItem key={item.title} data={item} userWidth={userWidth} />
                )}
            </div>
            <div className="contacts-page-address">
                {addressData.map((item, id) =>
                    <ContactsAddressItem key={id} data={item} />
                )}
            </div>
            <div className="contacts-page-map-wrap">
                <YMaps
                    query={{
                        ns: 'use-load-option',
                        load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon,geoObject.addon.hint'
                    }}>
                    <Map
                        className="contacts-page-map"
                        defaultState={
                             {
                                 center: [55.762597, 37.681038],
                                 zoom: 12,
                                 controls: ['zoomControl', 'fullscreenControl'],
                                 behaviors: ['drag']
                             }
                         }
                    >
                        {mapData.map((item, id) =>
                            <Placemark
                                key={id}
                                geometry={item.coordinates}
                                properties={{
                                    hintContent: item.hintContent
                                }}
                            />
                        )}
                    </Map>
                </YMaps>
            </div>
        </div>
    )
}

Contacts.propTypes = {
    userWidth: PropTypes.number.isRequired,
};

const mapStateToProps = ({globalReducer}) => ({
    userWidth: globalReducer.userWidth,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Contacts);