import express from 'express';
import { ChangePassword, DeleteUserByID, GetAllUsers, GetUserByID, Login, MakeAdmin, Register, UpdateBasket } from "./../Controllers/userController.js";
import { CheckAdmin } from "./../Middleware/CheckAdmin.js";
import { CheckToken } from "./../Middleware/CheckToken.js";
import { CheckSuperAdmin } from '../Middleware/CheckSuperAdmin.js';


const router = express.Router()

router.get("/users", CheckToken, GetAllUsers);

router.get("/users/:id", CheckToken, GetUserByID);

router.delete("/users/:id", CheckToken, CheckAdmin, DeleteUserByID);

router.post("/register", Register);

router.post("/login", Login);

router.put("/changepassword", CheckToken, ChangePassword);

router.put("/promote", CheckToken, CheckSuperAdmin, MakeAdmin);

router.put("/update-basket", CheckToken, UpdateBasket)

export default router