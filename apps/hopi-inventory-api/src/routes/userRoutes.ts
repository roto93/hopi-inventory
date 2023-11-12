import express from 'express'
import asyncHandler from 'express-async-handler'
import { login, register } from '../controllers/userController'


const router = express.Router()

router.route('/register')
  .post(asyncHandler(register))

router.route('/login')
  .post(asyncHandler(login))

const userRoutes = router

export default userRoutes