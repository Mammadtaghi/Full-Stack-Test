import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../../Context/userContext";
import style from "./index.module.scss";

function Navbar() {

  const { user, setUser } = useUser()

  const navigate = useNavigate()

  function handleLogout() {
    setUser({
      username:"",
      role:"",
      token:"",
      basket:[],
      wishlist:[],
    })

    setTimeout(() =>navigate('/'), 1);
  }

  return (
    <nav id={style['nav']}>
      <div className={style.container}>
        <div className={style.Lpart}>
          <strong className={style.strong}>Exclusive</strong>
        </div>
        <div className={style.Mpart}>
          <ul className={style.navList}>
            <li><NavLink to='/' className={style.navLink}>Home</NavLink></li>
            <li><NavLink to='/contact' className={style.navLink}>Contact</NavLink></li>
            <li><NavLink to='/about' className={style.navLink}>About</NavLink></li>
            <li>{user.role ? <NavLink to='/account' className={style.navLink}>Account</NavLink> : <NavLink to='/login' className={style.navLink}>Sign In</NavLink>}</li>
          </ul>
        </div>
        <div className={style.Rpart}>
          <div className={style.searchBox}>
            <input type="text" placeholder="What are you looking for ?" />
            <i style={{ cursor: 'pointer' }} className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className={style.IconContainer}>
            <i className="fa-regular fa-heart">
              <div className={style.countBox}>{user.wishlist.length}</div>
            </i>
            <i className="fa-solid fa-basket-shopping">
              <div className={style.countBox}>{user.basket.length}</div>
            </i>
            {user.role ? <NavLink to={'/account'}><i className={`fa-${'regular'} fa-circle-user ${style.accountIcon}`}>
              <ul className={style.subList}>
                <li onClick={handleLogout}>Log out</li>
              </ul>
            </i></NavLink> : null}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar