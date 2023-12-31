import React, { useState } from 'react'
import './index.scss'
import AdminPanelUsers from '../../Layouts/AdminPanel Users'
import CreateProduct from '../../Layouts/Account Layout/CreateProduct'

function AdminPanel() {

  const [showUsers, setShowUsers] = useState(false)

  const [showCreateProduct, setShowCreateProduct] = useState(false)

  return (
    <main>
      <h1 style={{fontSize:"100px"}}>Admin Panel</h1>
      <button onClick={()=>setShowUsers(!showUsers)}>Users</button>
      { showUsers ? <AdminPanelUsers /> : null}
      <button onClick={()=>setShowCreateProduct(!showCreateProduct)}>New Product</button>
      { showCreateProduct ? <CreateProduct /> : null}
    </main>
  )
}

export default AdminPanel