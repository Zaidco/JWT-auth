const express = require('express');
const { signup, signin, getUser, logout } = require('../controller/authController'); // Make sure getUser is exported
const jwtAuth = require('../middleware/jwtAuth'); // ✅ Import your JWT middleware

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.get('/user', jwtAuth, getUser); // ✅ Now jwtAuth is defined
authRouter.get('/logout',jwtAuth,logout)

module.exports = authRouter;
