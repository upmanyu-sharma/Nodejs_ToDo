import express from 'express';
import {getMyProfile, home, login, logout, register } from '../controller/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get("/", home)

router.post("/users/new", register)

router.post("/users/login", login)

router.get("/users/logout", logout)

router.get("/users/me", isAuthenticated, getMyProfile);

export default router;