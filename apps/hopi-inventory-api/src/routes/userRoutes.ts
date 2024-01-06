import express from 'express'
import asyncHandler from 'express-async-handler'
import { deleteUser, getUser, updateUser } from '../controllers/userController'
import { checkAuth } from '../controllers/authController'

const userRoutes = express.Router()

userRoutes.get('/me', checkAuth, asyncHandler(getUser))

userRoutes.patch('/', checkAuth, asyncHandler(updateUser))

userRoutes.delete('/:id', checkAuth, asyncHandler(deleteUser))

export default userRoutes