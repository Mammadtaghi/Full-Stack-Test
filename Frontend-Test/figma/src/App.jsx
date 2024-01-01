import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { BasketProvider } from "./Context/basketContext";
import { ProductProvider } from './Context/productContext';
import { WishlistProvider } from "./Context/wishlistContext";
import Layout from "./Layout/Layout";
import UserLayout from "./Layout/UserLayout";
import About from "./Pages/About Page";
import Account from "./Pages/Account Page";
import Cart from "./Pages/Cart Page";
import Checkout from "./Pages/Checkout Page";
import Contact from "./Pages/Contact Page";
import Error from "./Pages/Error Page";
import Home from './Pages/Home Page';
import Login from "./Pages/LogIn Page";
import SignUp from './Pages/SignUp Page';
import Wishlist from "./Pages/Whishlist Page";

function App() {

  return (
    <BrowserRouter>
      <ProductProvider>
        <BasketProvider>
          <WishlistProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path='/' element={<Home />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/contact' element={<Contact />}></Route>
                <Route path='/register' element={<SignUp />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='*' element={<Error />}></Route>
                <Route path="/" element={<UserLayout />}>
                  <Route path='/wishlist' element={<Wishlist />}></Route>
                  <Route path='/cart' element={<Cart />}></Route>
                  <Route path='/account' element={<Account />}></Route>
                  <Route path='/checkout' element={<Checkout />}></Route>
                </Route>
              </Route>
            </Routes>
          </WishlistProvider>
        </BasketProvider>
      </ProductProvider>
    </BrowserRouter>
  )
}

export default App
