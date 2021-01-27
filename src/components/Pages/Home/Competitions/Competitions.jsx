import './_competitions.scss';
import React, {useEffect, Suspense} from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {setCompetitionsQuantity, setCompetitionsList, setCompetitionsChunk} from "../../../../actions/homePageAction";
import BlocksHeader from "../BlocksHeader/BlocksHeader";
import CompetitionsItem from "./CompetitionsItem";
import Preloader from "../../../Preloader/Preloader";
import MyErrorBoundary from "../../../ErrorBoundary/MyErrorBoundary";


export const Competitions = (props) => {

    const {
        url,
        competitionsQuantity,
        competitionsList,
        competitionsChunk,
        setCompetitionsQuantity,
        setCompetitionsList,
        setCompetitionsChunk
    } = props;

    useEffect(() => {
        const url = `/api/competitions-api-quantity.json`;
        const fetchData = async () => {
            const result = await axios(
                url,
            );
            setCompetitionsQuantity(result.data.quantity);
        };
        fetchData();
    }, [competitionsChunk]);

    useEffect(() => {
        const url = `/api/competitions-api-${competitionsChunk}.json`;
        const fetchData = async () => {
            const result = await axios(
                url,
            );
            setCompetitionsList(result.data);
        };
        fetchData();
    }, [competitionsChunk]);

    const clickHandler = () => {
        setCompetitionsChunk(competitionsChunk + 1);
    };

    return(
        <div className="competitions-block">
            <MyErrorBoundary
                blockName='Конкурсы'
            >
                <Suspense
                    fallback={<Preloader/>}
                >
                    <BlocksHeader
                        blockName='Конкурсы'
                        btnText='смотреть все'
                        outerUrl="https://mosmetod.ru/centr/konkursy/konkursy.html"
                    />
                    <div className="competitions-block-wrap">
                        {competitionsList.map(item => {
                            return (
                                <CompetitionsItem
                                    key={item.id}
                                    data={item}
                                />
                            );
                        })}
                        {competitionsList.length !== competitionsQuantity && <button
                            className="load-more"
                            onClick={clickHandler}
                            type="button"
                        >
                            смотреть еще
                        </button>}
                    </div>
                </Suspense>
            </MyErrorBoundary>
        </div>
    )
}

Competitions.propTypes = {
    url: PropTypes.string.isRequired,
    competitionsQuantity: PropTypes.number.isRequired,
    competitionsList: PropTypes.array.isRequired,
    competitionsChunk: PropTypes.number.isRequired,
    setCompetitionsQuantity: PropTypes.func.isRequired,
    setCompetitionsList: PropTypes.func.isRequired,
    setCompetitionsChunk: PropTypes.func.isRequired,
};

const mapStateToProps = ({homePageReducer}) => ({
    competitionsQuantity: homePageReducer.competitionsQuantity,
    competitionsList: homePageReducer.competitionsList,
    competitionsChunk: homePageReducer.competitionsChunk,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setCompetitionsQuantity,
    setCompetitionsList,
    setCompetitionsChunk,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Competitions);