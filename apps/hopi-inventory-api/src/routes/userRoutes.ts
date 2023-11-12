import express from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'
import { loginFailed, loginSuccess, register } from '../controllers/userController'


const router = express.Router()

router.post('/register', asyncHandler(register))

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/user/loginFailed',
  failureFlash: true
}), asyncHandler(loginSuccess))

router.get('/loginFailed', asyncHandler(loginFailed))

const userRoutes = router

export default userRoutes