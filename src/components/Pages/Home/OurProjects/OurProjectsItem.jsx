import './_our-projects.scss';
import React from 'react';
import styled from 'styled-components';


function OurProjectsItem(props) {

    const {data, projectsPage} = props;

    const ColoredBlock = styled.div`
        color: #FFFFFF;
        font-weight: 300;
        font-size: 0.9rem;
        letter-spacing: 0.15px;
        padding: 10px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background: linear-gradient(to right top, ${data.gradient.start}, ${data.gradient.finish});
        border-radius: 0 0 3px 3px;
    `;

    return(
        <div
            className={data.in_archive ? 'our-projects-item-wrap archive projects-item' : 'our-projects-item-wrap projects-item'}
        >
            <a
                className={projectsPage ? "our-projects-page-item" : "our-projects-item"}
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className="our-projects-wrap">
                    <img
                        className="our-projects-logo"
                        loading="lazy"
                        src={data.logo}
                        alt={data.title}
                    />
                    <div className="our-projects-title">
                        {data.title}
                    </div>
                </div>
                <div className="our-projects-title-wrap">
                    <ColoredBlock>
                        {data.description}
                    </ColoredBlock>
                </div>
            </a>
        </div>
    )
}

export default OurProjectsItem;