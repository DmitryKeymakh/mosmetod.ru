import './_contacts.scss';
import React from 'react';

const AddressListItem = (props) => {

    const {data} = props;

    return (
        <div className="address-list-item">
            <div className="address-list-item-logo">{data.logo}</div>
            {/*<p className={data.email ? "address-list-item-logo address-list-item-email" : "address-list-item-logo"}>{data.text}</p>*/}
            {
                data.email
                ?
                <a
                    className={"address-list-item-logo address-list-item-email"}
                    href={`mailto:${data.text}`}
                >
                    {data.text}
                </a>
                :
                <p className={"address-list-item-logo"}>
                    {data.text}
                </p>
            }
        </div>
    )
}

const ContactsAddressItem = (props) => {

    const {data} = props;

    return (
        <div className="address-item">
            <h3 className="address-item-header">
                {data.title}
            </h3>
            {data.list.map((item, id) =>
                <AddressListItem key={id} data={item}/>
            )}
        </div>
    )
}

export default ContactsAddressItem;