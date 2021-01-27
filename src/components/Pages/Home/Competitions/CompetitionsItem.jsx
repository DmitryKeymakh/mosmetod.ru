import './_competitions.scss';
import React from 'react';
import styled from 'styled-components';


function CompetitionsItem(props) {

    const {data} = props;

    const ColoredBlock = styled.div`
        display: flex;
        justify-content: flex-end;
        padding: 1.1rem 1.1rem 1.1rem 0;
        font-size: 0.9rem;
        color: #ffffff;
        height: 100px;
        width: 100%;
        border-radius: 3px 3px 0 0;
        background: ${data.background};
    `;

    const DateBlock = styled.div`
        display: flex;
        justify-content: flex-end;
        padding: 0.6rem 0.6rem 0.6rem 0;
        font-size: 0.8rem;
        color: #686868; 
        height: 60px;
        width: 100%;
        background-color: #F9F9F9;
        border: solid #c3c3c3;
        border-width: 0 1px 1px 1px;
        border-radius: 0 0 3px 3px;
    `;

    const Logo = styled.div`
        position: absolute;
        top: 10px;
        left: 10px;
        width: 110px;
        height: 110px;
    `;

    return(
        <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="competitions-item-wrap fade-in"
        >
            <Logo>
                <img className="competitions-item-img" src={data.logo} alt="competitions-logo" />
            </Logo>
            <ColoredBlock>
                <div className="competitions-item-container">
                    {data.title}
                </div>
            </ColoredBlock>
            <DateBlock>
                <div className="competitions-item-container">
                    <div className="date-container">
                        <span>{data.dateCompetition.start} -</span>
                        <span>{data.dateCompetition.finish}</span>
                    </div>
                    {/*<WhiteButton url={data.url} title="Подробнее" />*/}
                </div>
            </DateBlock>
        </a>
    )
}

export default CompetitionsItem;