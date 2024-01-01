import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { jwtDecode } from "jwt-decode";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import * as Yup from "yup";
import { object } from "yup";
import { useUser } from '../../../Context/userContext';
import Button from '../../Common Components/Button';
import "./index.scss";

const LoginInitialValues = {
   username: '',
   password: '',
}

const loginSchema = object({
   username: Yup.string()
      .notOneOf(['admin', 'user'], "Don't be a kid!")
      .min(2, "Your name Can't be this Short!")
      .max(20, "Your name Can't be this Long!")
      .required('This is required'),
   password: Yup.string()
      .min(2, "Password should contain at least 2 characters!")
      .required("You need a password to access!"),
});

const StyledField = styled(Field)`
    border:none;
    background-image:none;
    background-color:transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    padding: 8px;
    border-bottom: 1px solid black;
    font-size: 18px;

    &:focus{
      outline: none;
    }
`

function LoginForm() {

   const { user, setUser } = useUser()
   const navigate = useNavigate()
   const [res, setRes] = useState(null)

   async function handleValues(values) {
      try {
         console.log(values);

         const response = await axios.post("http://localhost:8000/login", values).then(res => res.data)

         setRes(response)

         const Decoded = jwtDecode(response, "AlbiKey")

         setUser({
            username: Decoded.username,
            role: Decoded.role,
            basket: Decoded.basket,
            wishlist: Decoded.wishlist,
            token: response,
         })

         navigate("/")

      } catch (error) {
         console.log(error.response.data.message);
      }
   }

   return (
      <div className='formContainer'>
         <div className="formTitle">
            <h1 className='loginTitle'>Log in to Exclusive</h1>
            <h4>Enter your details below</h4>
         </div>
         <Formik
            initialValues={LoginInitialValues}
            validationSchema={loginSchema}
            onSubmit={(values) => handleValues(values)}
         >
            <Form className='loginForm'>
               <label htmlFor="username">Username or Email</label>
               <StyledField id="username" name="username" placeholder="username" type='username' />
               <ErrorMessage name='username' />

               <label htmlFor="password">Password</label>
               <StyledField id="password" name="password" placeholder="Password" type="password" />
               <ErrorMessage name='password' />

               <div className="SUButtonContainer">
                  <Button id='createButton' type="submit">Log In</Button>
                  <a id='forgotPass' href="/login">Forgot Password?</a>
               </div>
            </Form>
         </Formik>
         {/* {res ? res : null} */}
         <p className='dontHaveAcc'>Do not have an account yet? <Link to="/register">Create an Account</Link></p>
      </div>
   )
}

export default LoginForm