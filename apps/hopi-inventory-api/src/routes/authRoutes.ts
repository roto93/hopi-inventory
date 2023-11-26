import express from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'
import { checkAuth, loginFailed, loginSuccess, logout, register, testPrivate } from '../controllers/authController'


const userRoutes = express.Router()

userRoutes.post('/register', asyncHandler(register))


userRoutes.post('/login', passport.authenticate('local', {
  failureRedirect: '/auth/loginFailed',
  failureFlash: true
}), asyncHandler(loginSuccess))


userRoutes.post('/logout', asyncHandler(logout))


userRoutes.get('/loginFailed', asyncHandler(loginFailed))


userRoutes.get('/testPrivate', checkAuth, asyncHandler(testPrivate))


export default userRoutes