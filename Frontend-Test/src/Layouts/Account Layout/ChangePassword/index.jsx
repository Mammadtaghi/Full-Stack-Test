import React, { useState } from 'react';
import './index.scss';
import axios from 'axios';
import { useUser } from '../../../Context/userContext';

function ChangePassword() {

    const { user } = useUser()

    const [res, setRes] = useState('')

    async function handleValues(e) {
        try {
            e.preventDefault();
            const newPassword = e.target.changePassword.value;
    
            if (!newPassword) {
                console.log('Enter New Password!');
            }
    
            const response = await axios({
                method: 'put',
                url: 'http://localhost:8000/changepassword',
                data: {
                    newPassword: newPassword
                },
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                }

            }).then(res=>res.data)
    
            console.log(response);
            setRes(response)
        } catch (error) {
            console.log(error);
            setRes(error)
        }
    }

    return (
        <section>
            <form onSubmit={(e) => handleValues(e)}>
                <input type="text" id='changePassword' name='changePassword' placeholder='Enter New Password' /><br />
                <input type="submit" value="Change" />
            </form>
            { res ? res : null }
        </section>
    )
}

export default ChangePassword;
