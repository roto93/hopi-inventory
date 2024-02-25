import express from 'express'
import asyncHandler from 'express-async-handler'
import { checkAuth } from '../controllers/authController'
import { createCategory, deleteCategory, getCategoriesOfEvent, getCategory, updateCategory } from '../controllers/categoryController'


const categoryRoutes = express.Router()

categoryRoutes.get('/:categoryID', checkAuth, asyncHandler(getCategory))

categoryRoutes.get('/', checkAuth, asyncHandler(getCategoriesOfEvent))

categoryRoutes.post('/', checkAuth, asyncHandler(createCategory))

categoryRoutes.patch('/', checkAuth, asyncHandler(updateCategory))

categoryRoutes.delete('/', checkAuth, asyncHandler(deleteCategory))


export default categoryRoutes