import React, { useState } from 'react'
import './index.scss'
import { useUser } from '../../Context/userContext'
import ChangePassword from '../../Layouts/Account Layout/ChangePassword'

function Account() {

  const { user, setUser } = useUser()

  const [wantNewPass, setWantNewPass] = useState(false)

  function handleLogout() {
    setUser({username:'', role:"", token:""})
  }


  return (
    <main>
      <h1>{user.username}</h1>
      <h2>{user.role}</h2>
      <button onClick={handleLogout}>Log Out</button><br />
      <button onClick={()=>setWantNewPass(!wantNewPass)}>Change Password</button>
      { wantNewPass ? <ChangePassword/> : null }
    </main>
  )
}

export default Account