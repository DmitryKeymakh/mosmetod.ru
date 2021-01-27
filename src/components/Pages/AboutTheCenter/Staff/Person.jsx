import './_staff.scss';
import api from "../../../../assets/api";
import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {
    setPersonId,
    setPersonData,
} from "../../../../actions/aboutTheCenterAction";


export const Person = (props) => {

    const {setPersonData, personData, setPersonId, personId} = props;

    window.scroll(0, 0);

    if (!personId) {
        const urlArray = window.location.pathname.split('/');
        const id = urlArray[4];
        setPersonId(+id);
    }

    const url = `${api.getUserInfo}?id=${personId}`;

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                url,
            );
            setPersonData(result.data);
        };
        fetchData();
    }, [personId]);

    return (
        <div className="person">
            {personData && <div className="person-header-block">
                <img
                    className="staff-item-image person-image"
                    src={personData.image}
                    alt={personData.users_fio}
                />
                <div className="person-position-wrap">
                    <h1 className="person-name">{personData.fio}</h1>
                    <h2 className="person-position">{personData.position}</h2>
                </div>
            </div>}
            {personData && <h3 className="person-header">Биография</h3>}
            <div
                className="person-information"
                dangerouslySetInnerHTML={{__html: personData.basic_information}}
            />
        </div>
    )
}

Person.propTypes = {
    personId: PropTypes.number.isRequired,
    setPersonId: PropTypes.func.isRequired,
    personData: PropTypes.object.isRequired,
    setPersonData: PropTypes.func.isRequired,
};

const mapStateToProps = ({aboutTheCenterReducer}) => ({
    personId: aboutTheCenterReducer.personId,
    personData: aboutTheCenterReducer.personData,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setPersonId,
    setPersonData,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Person);