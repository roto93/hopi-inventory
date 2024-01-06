import express from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'
import { checkAuth, loginFailed, loginSuccess, logout, register, testPrivate } from '../controllers/authController'


const authRoutes = express.Router()

authRoutes.post('/register', asyncHandler(register))


authRoutes.post('/login', passport.authenticate('local', {
  failureRedirect: '/auth/loginFailed',
  failureFlash: true
}), asyncHandler(loginSuccess))


authRoutes.post('/logout', asyncHandler(logout))


authRoutes.get('/loginFailed', asyncHandler(loginFailed))


authRoutes.get('/testPrivate', checkAuth, asyncHandler(testPrivate))


export default authRoutes