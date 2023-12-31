import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import { useUser } from '../../Context/userContext';
import './index.scss';

function AdminPanelUsers() {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get All Users

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user.token]);

  // Delete

  async function handleDelete(id) {
    try {

      const getUser = await axios.get(`http://localhost:8000/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }).then(res => res.data)

      if (getUser.role.includes("Admin")) {
        alert("You can't delete Admins");
        return
      }

      // This is used to delete but we dont want to lose our users
      const res = await axios.delete(`http://localhost:8000/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      }).then(res => res.data)

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <h1>User List</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) :
        <ul key={uuidv4()}>
          {users.map((item) => (
            <li key={uuidv4()}>
              <h3>Username: {item.username}</h3>
              <h4>Role: {item.role}</h4>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      }
    </section>
  );
}

export default AdminPanelUsers;