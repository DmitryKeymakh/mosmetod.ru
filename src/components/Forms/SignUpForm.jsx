import './_forms.scss';
import React from 'react';
// import 'babel-polyfill';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


export default class SignUpForm extends React.Component {
    constructor(props) {
        super(props);

        this.SignUpSchema = Yup.object({
            name: Yup.string()
                .required('Введите ФИО')
                .max(100, 'Не больше 100 символов'),
                // .matches(//, ''),
            email: Yup.string()
                .email('Неправильный имейл')
                .required('Введите имейл')
                .test(
                    'password-check',
                    'Пользователь с таким email уже зарегистрирован',
                    // async (value) => (await fetch('/password-check/' + value)).responseText === 'true',
                    async () => (await fetch('https://raw.githubusercontent.com/DmitryKeymakh/front/master/api/check-password.json')).status !== 200,
                    // () => false,
                    // () => true,
                ),
            password: Yup.string()
                .required('Введите пароль')
                .min(6, 'Минимальная длина: 6 символов')
                .max(20, 'Максимальная длина: 20 символов')
                .matches(/[a-zA-Z0-9]\w/, 'Используйте латинские буквы, цифры и знак нижнего подчеркивания'),
            passwordRepeat: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Пароль должен совпадать')
        });
    }
    render() {
        return (
            <Formik
                initialValues={{ name: '', email: '', password: '',passwordRepeat: '' }}
                validationSchema={this.SignUpSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <label className="text-label" htmlFor="name">Введите ФИО</label>
                        <Field
                            className={errors.name && touched.name ? ('text-input error') : ('text-input')}
                            placeholder="Мнацаканян Армен Валерьевич"
                            name="name"
                            type="text"/>
                        <ErrorMessage
                            component="div"
                            className="input-feedback"
                            name="name"/>
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
                        <label className="text-label" htmlFor="passwordRepeat">Повторите пароль</label>
                        <Field
                            className={errors.passwordRepeat && touched.passwordRepeat ? ('text-input input-password error') : ('text-input input-password')}
                            placeholder="Повторите пароль"
                            name="passwordRepeat"
                            type="password"/>
                        <ErrorMessage
                            component="div"
                            className="input-feedback"
                            name="passwordRepeat"/>
                        <button className="button-form" type="reset">Reset</button>
                        <button className="button-form" type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        );
    }
}