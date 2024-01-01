import React from 'react'
import { useUser } from '../Context/userContext'
import { Outlet } from 'react-router-dom'

function UserLayout() {

    const { user } = useUser()

    return (
        <>
            {user.username ? <Outlet /> : null}
        </>
    )
}

export default UserLayout