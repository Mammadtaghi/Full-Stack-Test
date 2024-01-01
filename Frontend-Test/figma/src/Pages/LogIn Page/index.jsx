import React from 'react'
import StaticPartLR from '../../Components/Login-SignUp Components/StaticPart'
import LoginForm from './../../Components/Login-SignUp Components/Login Form'
import './index.scss'

function Login() {
  return (
    <main>
      <StaticPartLR><LoginForm/></StaticPartLR>
    </main>
  )
}

export default Login