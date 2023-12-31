import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import "./index.scss";
import { useUser } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";

const FormikInitialValues = {
    username: '',
    password: '',
}

const LogInSchema = Yup.object().shape({
    username: Yup.string()
        .notOneOf(['admin', 'user'], "Don't be a kid!")
        .min(2, "Your name Can't be this Short!")
        .max(20, "Your name Can't be this Long!")
        .required('This is required'),
    password: Yup.string()
        .min(2, "Password should contain at least 2 characters!")
        .required("You need a password to access!"),
    role: Yup.string()
})

function LogIn() {

    const { user, setUser } = useUser()

    const [res, setRes] = useState('')

    const navigate = useNavigate()

    async function handleValues(values) {
        try {
            const response = await axios.post('http://localhost:8000/login', values)

            const data = response.data

            const DecodedUser = jwtDecode(data, "AlbiKey")

            setUser({
                username: DecodedUser.username,
                role: DecodedUser.role,
                basket: DecodedUser.basket,
                wishlist: DecodedUser.wishlist,
                token: data
            })

            console.log(data);
            navigate('/')

        } catch (error) {
            console.log(error.response.data.message);
            setRes(error.response.data.message)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Log In</h1>
            <Formik
                initialValues={FormikInitialValues}
                validationSchema={LogInSchema}
                onSubmit={values => handleValues(values)}
            >
                <Form className="AlbiForm">

                    <label htmlFor="username">Username</label>
                    <Field id='' name='username' placeholder='Enter username' />
                    <ErrorMessage component={'span'} name="username" />
                    <label htmlFor="password">Password</label>
                    <Field id='' name='password' placeholder='Enter password' />
                    <ErrorMessage component={'span'} name="password" />

                    <button type="submit">Submit</button>

                </Form>
            </Formik>
            <span>{res}</span>
            <Link to='/register'>Go to Register</Link>
        </div>
    )
}

export default LogIn