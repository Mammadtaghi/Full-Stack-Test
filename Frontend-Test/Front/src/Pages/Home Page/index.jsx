import React, { useState } from 'react';
import { v4 } from "uuid";
import { useUser } from '../../Context/userContext';
import useFetch from '../../Hooks/useFetch';
import './index.scss';
import axios from 'axios';

function Home() {

  const { user, AddToBasket, AddToWishlist } = useUser()

  const [Products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const url = 'http://localhost:8000/products'

  useFetch(url, GetProducts)

  function GetProducts(data) {
    setProducts(data)
    setIsLoading(false)
  }

  async function DeleteProduct(item) {
    console.log(item);
    const response = await axios({
      method: 'delete',
      url: `http://localhost:8000/products/${item._id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      }
    }).then(res => res.data)
    console.log(response);
  }

  return (
    <main>
      {isLoading ? <h1>Loading...</h1> : Products && Products.map(item => (
        <div key={v4()}>
          <h2>{item.title}</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}><h3 style={item.discount ? { textDecoration: "line-through" } : {}}>${item.price}</h3>{item.discount ? <h3>${(item.price * (100 - item.discount)) / 100}</h3> : null}</div>
          {user.username ? <button onClick={() => AddToBasket(item)} >Add To Cart</button> : null}
          {user.username ? <button onClick={() => AddToWishlist(item)} >Add To Wishlist</button> : null}
          {user.username ? <button onClick={() => DeleteProduct(item)} >Delete</button> : null}
        </div>
      ))}
    </main>
  )
}

export default Home