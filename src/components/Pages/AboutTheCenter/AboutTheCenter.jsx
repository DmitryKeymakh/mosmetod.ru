import './_about-center.scss';
import AboutTheCenterContent from "./AboutTheCenterContent";
import AboutTheCenterNavigation from "./AboutTheCenterNavigation";
import AboutCenterMobileNavigation from "./AboutCenterMobileNavigation";
import React, {useEffect} from 'react';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {setUserWidth,} from '../../../actions/globalAction';
import {setBurgerOpen,} from '../../../actions/aboutTheCenterAction';
import burgerIcon from './images/burger-open.svg';
import Error404 from "../Error404/Error404";


const AboutTheCenter = (props) => {

    const activeCategory = props.match.params.url;

    const {
        userWidth,
        setUserWidth,
        setBurgerOpen,
    } = props;

    const aboutCenterContent = {
        "main-info": {
            "id": 1,
            "url": "main-info",
            "title": "Основные сведения",
            "links": []
        },
        "constituent-documents": {
            "id": 2,
            "url": "constituent-documents",
            "title": "Учредительные документы",
            "links": [
                {
                    "title": "Лицензия",
                    "url": "https://mosmetod.ru/files/normarivnie_documenty/ustavnie_center/%D0%BB%D0%B8%D1%86%D0%B5%D0%BD%D0%B7%D0%B8%D1%8F20.pdf"
                },
                {
                    "title": "Устав",
                    "url": "https://mosmetod.ru/files/center/khr1/%D0%A3%D1%81%D1%82%D0%B0%D0%B2-%D0%A0%D0%B5%D0%B4%D0%B0%D0%BA%D1%86%D0%B8%D1%8F%20%E2%84%96%206,%202015%20%D0%B3..pdf"
                },
                {
                    "title": "Изменения в редакцию № 6 Устава",
                    "url": "https://mosmetod.ru/files/center/Uchredit/%D0%98%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B2_%D1%80%D0%B5%D0%B4%D0%B0%D0%BA%D1%86%D0%B8%D1%8E__6_%D0%A3%D1%81%D1%82%D0%B0%D0%B2%D0%B0.pdf"
                },
                {
                    "title": "Свидетельство о постановке на учёт в налоговом органе (ИНН)",
                    "url": "https://mosmetod.ru/files/center/Uchredit/svidetelstvo.PDF"
                },
                {
                    "title": "Свидетельство о внесении в ЕГРЮЛ",
                    "url": "https://mosmetod.ru/files/center/%D0%A1%D0%B2-%D0%B2%D0%BE_%D0%BE_%D0%B2%D0%BD%D0%B5%D1%81%D0%B5%D0%BD%D0%B8%D0%B8_%D0%B2_%D0%95%D0%93%D0%A0%D0%AE%D0%9B_%D0%BE%D1%82_20.01.2003.pdf"
                },
                {
                    "title": "Свидетельство регистрации права",
                    "url": "https://mosmetod.ru/files/normarivnie_documenty/ustavnie_center/%D0%A1%D0%B2-%D0%B2%D0%BE_%D0%BE_%D1%80%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D0%B8_%D0%BF%D1%80%D0%B0%D0%B2%D0%B0_%D0%92%D0%BE%D1%80%D0%BE%D0%BD%D1%86%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F.pdf"
                },
                {
                    "title": "Приказ о реорганизации (от 5.06.2013 № 256)",
                    "url": "https://mosmetod.ru/files/center/Uchredit/%D0%9F%D1%80%D0%B8%D0%BA%D0%B0%D0%B7.pdf"
                },
                {
                    "title": "Приказ о реорганизации (от 25.05.2015 № 229)",
                    "url": "https://mosmetod.ru/metodicheskoe-prostranstvo/documenti/prikaz-dogm-ot-25-05-2015-229-o-reorganizatsii-gosudarstvennykh-obrazovatelnykh-organizatsij-podvedomstvennykh-departamentu-obrazovaniya-goroda-moskvy.html"
                },
                {
                    "title": "Приказ о реорганизации (от 13.03.2014 № 210)",
                    "url": "https://mosmetod.ru/files/normarivnie_documenty/ustavnie_center/%D0%9F%D1%80%D0%B8%D0%BA%D0%B0%D0%B7__210___%D0%9F%D1%80%D0%BE%D1%84%D1%82%D0%B5%D1%85%D0%A2%D0%B5%D1%85%D0%BD%D0%BE%D0%BF%D0%B0%D1%80%D0%BA%D0%A6%D0%A0%D0%9E%D0%A3.pdf"
                }
            ]
        },
        "financial-documents": {
            "id": 3,
            "url": "financial-documents",
            "title": "Финансовые документы",
            "links": [
                {
                    "title": "Государственное задание 2020",
                    "url": "https://mosmetod.ru/files/center/Uchredit/%D0%93%D0%BE%D1%81%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5_2020.pdf"
                },
                {
                    "title": "План финансово-хозяйственной деятельности 2020",
                    "url": "https://mosmetod.ru/files/center/Uchredit/%D0%9F%D0%BB%D0%B0%D0%BD_%D0%A4%D0%A5%D0%94_2020.pdf"
                }
            ]
        },
        "self-examination": {
            "id": 4,
            "url": "self-examination",
            "title": "Самообследование",
            "links": [
                {
                    "title": "Самообследование",
                    "url": "https://mosmetod.ru/files/center/Uchredit/%D0%A1%D0%B0%D0%BC%D0%BE%D0%BE%D0%B1%D1%81%D0%BB%D0%B5%D0%B4%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5.pdf"
                }
            ]
        },
        "mto": {
            "id": 5,
            "url": "mto",
            "title": "Материально-техническое обеспечение",
            "links": []
        },
        "paid-services": {
            "id": 6,
            "url": "paid-services",
            "title": "Документы о предоставлении платных образовательных услуг",
            "links": [
                {
                    "title": "Порядок осуществления деятельности, приносящей доход",
                    "url": "https://mosmetod.ru/files/center/khr1/%D0%9F%D0%9E%D0%A0%D0%AF%D0%94%D0%9E%D0%9A_%D0%BE%D1%81%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F_%D0%B4%D0%B5%D1%8F%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8_%D0%BF%D1%80%D0%B8%D0%BD%D0%BE%D1%81%D1%8F%D1%89%D0%B5%D0%B9_%D0%B4%D0%BE%D1%85%D0%BE%D0%B4.pdf"
                },
                {
                    "title": "Перечень услуг",
                    "url": "https://mosmetod.ru/files/PERECHRNUSLUGGMC.pdf"
                }
            ]
        },
        "prescriptions": {
            "id": 7,
            "url": "prescriptions",
            "title": "Предписания",
            "links": []
        },
        "staff": {
            "id": 9,
            "url": "staff",
            "title": "Руководство. Педагогический (научно-педагогический) состав",
            "links": []
        },
        "working-conditions": {
            "id": 10,
            "url": "working-conditions",
            "title": "Специальная оценка условий труда",
            "links": [
                {
                    "title": "Сведения о проведении СОУТ в феврале 2019 года",
                    "url": "https://mosmetod.ru/files/center/Uchredit/%D0%A1%D0%9E%D0%A3%D0%A2-02-2019.pdf"
                },
                {
                    "title": "Сведения о проведении СОУТ в апреле 2019 года",
                    "url": "https://mosmetod.ru/files/dokumenty/%D0%A1%D0%9E%D0%A3%D0%A2-04-2019.pdf"
                }
            ]
        },
        "collective-agreement": {
            "id": 11,
            "url": "collective-agreement",
            "title": "Коллективный договор",
            "links": [
                {
                    "title": "Коллективный договор на 2019–2021 годы",
                    "url": "https://mosmetod.ru/files/center/Kollektivny_dogovor_2019.pdf"
                }
            ]
        },
        "personal-data": {
            "id": 12,
            "url": "personal-data",
            "title": "Обработка персональных данных",
            "links": [
                {
                    "title": "Политика ГБОУ ГМЦ ДОНМ в отношении обработки персональных данных",
                    "url": "https://mosmetod.ru/files/center/Uchredit/%D0%BF%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0.pdf"
                }
            ]
        }
    }

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setUserWidth(document.documentElement.clientWidth);

            window.addEventListener("resize", function () {
                setUserWidth(document.documentElement.clientWidth);
            }, false);
        }
        return () => mounted = false;
    }, [setUserWidth]);

    return activeCategory === undefined || aboutCenterContent[activeCategory]
        ?
        <>
            <div className="about-center-main-wrap">
                {userWidth < 1080 &&
                <AboutCenterMobileNavigation
                    userWidth={userWidth}
                    content={aboutCenterContent}/>
                }
                <div>
                    <div className="about-center-header-block">
                        О центре
                        {userWidth < 1080 &&
                        <img className="about-center-burger-open-icon" src={burgerIcon} alt="разделы"
                             onClick={() => setBurgerOpen(true)}/>
                        }
                    </div>
                    <AboutTheCenterContent
                        activeCategory={activeCategory}
                        content={activeCategory ? aboutCenterContent[activeCategory] : aboutCenterContent["main-info"]}/>
                </div>
                {userWidth > 1080 &&
                <AboutTheCenterNavigation
                    content={aboutCenterContent}/>
                }
            </div>
        </>
        :
        <Error404/>
}

const mapStateToProps = ({globalReducer}) => ({
    userWidth: globalReducer.userWidth,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setUserWidth,
    setBurgerOpen,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AboutTheCenter);