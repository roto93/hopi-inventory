import express from 'express'
import asyncHandler from 'express-async-handler'
import { login, register } from '../controllers/userController'


const router = express.Router()

router.post('/register', asyncHandler(register))

router.post('/login', asyncHandler(login))

const userRoutes = router

export default userRoutes