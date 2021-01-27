import './_staff.scss';
import DefaultImage from '../../../../assets/images/anonymous.png';
import React from "react";
import {Link} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {
    setPersonId,
} from "../../../../actions/aboutTheCenterAction";
import PropTypes from "prop-types";


const StaffCategoryItem = (props) => {

    const {data, setPersonId} = props;

    const StaffItem = (props) => {

        const {data} = props;

        const StaffItemLink = () => {
            return (
                <Link
                    className="staff-item-wrap"
                    to={`staff/person/${data.users_id}`}
                    onClick={() => {
                        setPersonId(data.users_id)
                    }}
                >
                    <div className="staff-item-image-wrap">
                        <img
                            className="staff-item-image"
                            src={data.users_image ? data.users_image : DefaultImage}
                            alt={data.users_fio}
                        />
                    </div>
                    <h4 className="staff-item-name">
                        {data.users_fio}
                    </h4>
                </Link>
            )
        }

        const StaffItemBlock = () => {
            return (
                <div className="staff-item-wrap">
                    <div className="staff-item-image-wrap">
                        <img
                            className="staff-item-image"
                            src={data.users_image ? data.users_image : DefaultImage}
                            alt={data.users_fio}
                        />
                    </div>
                    <h4 className="staff-item-name">
                        {data.users_fio}
                    </h4>
                </div>
            )
        }

        return (
            <div className="staff-item">
                {
                    data.link
                        ?
                        <StaffItemLink />
                        :
                        <StaffItemBlock />
                }
                <div
                    className="staff-item-text"
                    dangerouslySetInnerHTML={{__html: data.users_description}}
                />
            </div>
        )
    }
    return(
        <div className="staff-content-wrap">
            <h3 className="staff-content-header">
                {data.name}
            </h3>
            <div className="staff-content-item">
                {data.user.map(item =>
                    <StaffItem key={item.users_id} data={item} />
                )}
            </div>
        </div>
    )
}

StaffCategoryItem.propTypes = {
    setPersonData: PropTypes.func.isRequired,
};

const mapStateToProps = ({aboutTheCenterReducer}) => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
    setPersonId,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StaffCategoryItem);