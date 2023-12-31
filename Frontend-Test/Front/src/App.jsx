import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUser } from './Context/userContext';
import Layout from "./Layouts/Layout";
import Account from './Pages/Account Page';
import AdminPanel from './Pages/AdminPanel Page';
import Error from "./Pages/Error Page";
import Home from "./Pages/Home Page";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import './App.css';

function App() {

  const { user, setUser } = useUser()

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/*" element={<Error />} />
            {((user.role.includes("User") || user.role.includes("Admin")) ) ? <Route path='/account' element={<Account/>}>Account</Route> : ''}
            {(user.role.includes("Admin")) ? <Route path='/adminpanel' element={<AdminPanel/>}>AdminPanel</Route> : ''}

          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
