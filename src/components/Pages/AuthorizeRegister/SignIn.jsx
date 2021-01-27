import React from 'react';
import SignInForm from '../../Forms/SignInForm';


export default class SignIn extends React.Component {

    render() {
        return (
            <>
                <div className="check-in-warning check-in-warning-hide">Неверный email или пароль.</div>
                <SignInForm />
            </>
        )
    }
}