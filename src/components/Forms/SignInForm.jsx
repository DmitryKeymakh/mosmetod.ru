import './_forms.scss';
import React from 'react';
// import 'babel-polyfill';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ShowHidePassword from './ShowHidePassword/ShowHidePassword';


export default class SignInForm extends React.Component {
    constructor(props) {
        super(props);

        this.SignInSchema = Yup.object({
            email: Yup.string()
                .email('Неправильный email')
                .required('Введите email'),
            password: Yup.string()
                .required('Введите пароль')
                .min(6, 'Минимальная длина: 6 символов'),
        });
    }

    render() {
        return (
            <Formik
                initialValues={{password: '', email: ''}}
                validationSchema={this.SignInSchema}
                // validateOnChange={false}
                onSubmit={(values, {setSubmitting}) => {
                    fetch('https://raw.githubusercontent.com/DmitryKeymakh/front/master/api/check-password.json')
                        .then (response => {
                            const block = document.querySelector('.check-in-warning');
                            if (response.status === 200) {
                                block.classList.add('check-in-warning-hide');

                                setTimeout(() => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                 }, 400);

                                // setSubmitting(true);
                                // window.location.href = 'http://localhost:8081/';
                            } else {
                                block.classList.remove('check-in-warning-hide');
                                setSubmitting(false);
                            }
                        })
                    }
                }
            >
                {({errors, touched}) => (
                    <Form>
                        <label className="text-label" htmlFor="email">Email</label>
                        <Field
                            className={errors.email && touched.email ? ('text-input error') : ('text-input')}
                            placeholder="Введите email"
                            name="email"
                            type="email"/>
                        <ErrorMessage
                            component="div"
                            className="input-feedback"
                            name="email"/>
                        <label className="text-label" htmlFor="password">Пароль</label>
                        <Field
                            className={errors.password && touched.password ? ('text-input input-password error') : ('text-input input-password')}
                            placeholder="Введите пароль"
                            name="password"
                            type="password"/>
                        <ErrorMessage
                            component="div"
                            className="input-feedback"
                            name="password"/>
                        <Field
                            component={ShowHidePassword}/>
                        <button className="button-form" type="reset">Reset</button>
                        <button className="button-form" type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        );
    }
}