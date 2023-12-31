import React, { useState } from 'react'
import "./index.scss";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import { useUser } from '../../Context/userContext';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const FormikInitialValues = {
    username: '',
    password: '',
}

const SignUpSchema = Yup.object().shape({
    username: Yup.string()
        .notOneOf(['admin', 'user'], "Don't be a kid!")
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required('This is required'),
    password: Yup.string()
        .min(4, "Password should contain at least 4 characters!")
        .required("You need a password"),
    role: Yup.string()
})

function SignUp() {

    const navigate = useNavigate()

    const { user, setUser } = useUser()

    const [response, setResponse] = useState('')

    async function handleValues(values) {
        try {
            const response = await axios.post('http://localhost:8000/register', values)

            const data = response.data

            const DecodedUser = jwtDecode(data, "AlbiKey")

            setResponse(data)

            setUser({
                username: DecodedUser.username,
                role: DecodedUser.role,
                basket: DecodedUser.basket,
                wishlist: DecodedUser.wishlist,
                token: data
            })

            navigate('/')

        } catch (error) {
            console.log(error.response.data.message);
            setResponse(error.response.data.message)
        }
    }

    return (
        <>
            <h1>Sign Up</h1>
            <Formik
                initialValues={FormikInitialValues}
                validationSchema={SignUpSchema}
                onSubmit={values => handleValues(values)}
            >
                <Form className="AlbiForm">

                    <label htmlFor="username">Username</label>
                    <Field id='' name='username' placeholder='Enter username' />
                    <ErrorMessage name="username" />
                    <label htmlFor="password">Password</label>
                    <Field id='' name='password' placeholder='Enter password' />
                    <ErrorMessage name="password" />

                    <button type="submit">Submit</button>

                </Form>
            </Formik>
            <Link to='/login'>Go to Login</Link>
            <p>{response && response}</p>
        </>
    )
}

export default SignUp