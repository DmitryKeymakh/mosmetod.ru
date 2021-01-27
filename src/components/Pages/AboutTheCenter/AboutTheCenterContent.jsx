import React from 'react';
import './_about-center.scss';
import connect from "react-redux/es/connect/connect";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";

const Staff = React.lazy(() => import('./Staff/Staff'));


const AboutTheCenterContent = (props) => {


    const {
        content,
    } = props;

    return (
        <>
            <div className="about-center-content-wrap">
                {
                    content.id === 1 &&
                    <div className="about-center-content-img"/>
                }
                <div className="about-center-content-header-block">
                    <div className="about-center-content-header">
                        {content.title}
                    </div>
                    <div className="about-center-content-header-stripe"/>
                </div>
                {
                    content.id === 9 &&
                    <Staff/>
                }
                {
                    content.id !== 1 && content.id !== 9 &&
                    <div className="about-center-content-links-wrap">
                        {
                            content.links.map((item, index) =>
                                <a target="_blank" rel="noopener noreferrer"
                                   className="about-center-content-link"
                                   href={item.url}
                                   key={index}>
                                    {item.title}
                                </a>
                            )
                        }
                    </div>
                }
                {
                    content.id === 1 &&
                    <div className="about-center-content-text">
                        <p>Городской методический центр – современная площадка конвергентных образовательных
                            проектов и технологий, объединяющая инициативы учителей, педагогов, лидеров
                            столичного
                            образования и жителей мегаполиса с целью обеспечения непрерывного роста качества
                            образования города Москвы за счёт эффективного использования ресурсов
                            города.</p>
                        <p>Специалистами Городского методического центра осуществляется комплексное
                            системное
                            методическое обеспечение каждой образовательной организации столицы,
                            образовательной
                            программы, учителя.</p>
                        <p>Безграничные возможности московского образования гарантированы безграничными
                            возможностями каждого ребёнка, реализацию которых обеспечивают учителя, школы,
                            город,
                            проекты которого – инвестиции в своё будущее.</p>
                        <p>Наша миссия – всестороннее содействие в решении актуальных задач, стоящих перед
                            педагогической общественностью города, предоставление учителям Москвы
                            качественной
                            методической поддержки и образовательных услуг.</p>
                    </div>
                }
            </div>
        </>
    )
}

AboutTheCenterContent.propTypes = {};

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AboutTheCenterContent);