import React from 'react'
import './index.scss'
import { NavLink } from 'react-router-dom'
import { useUser } from '../../Context/userContext'

function Navbar() {

  const { user, setUser } = useUser()

  return (
    <nav style={{ display: 'flex', columnGap: '10px' }}>
      <NavLink to={'/'}>Home</NavLink>
      { user.role ? "" : <NavLink to={'/register'}>Sign Up</NavLink>}
      { user.role ? "" : <NavLink to={'/login'}>Login</NavLink>}
      { (user.role.includes("User") || user.role.includes("Admin")) ? <NavLink to={'/account'}>Account</NavLink> : ''}
      { (user.role.includes("Admin")) ? <NavLink to={'/adminpanel'}>AdminPanel</NavLink> : ''}
    </nav>
  )
}

export default Navbar