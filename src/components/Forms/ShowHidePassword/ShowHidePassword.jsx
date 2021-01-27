import './_show-hide-password.scss';
import React from 'react';


export default class ShowHidePassword extends React.Component {

    handleChange() {
        const inputBlock = document.querySelector('.input-password');
        const typeOfInput = inputBlock.getAttribute('type');
        if (typeOfInput === 'password') {
            inputBlock.setAttribute('type', 'text');
        } else {
            inputBlock.setAttribute('type', 'password');
        }
    }

    render() {
        return (
            <label className="show-hide text-label">
                Показывать пароль
                <input className="show-hide-input" type="checkbox" onChange={this.handleChange} />
            </label>
        )
    }
}