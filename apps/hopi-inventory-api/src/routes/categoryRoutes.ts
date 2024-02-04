import express from 'express'
import asyncHandler from 'express-async-handler'
import { checkAuth } from '../controllers/authController'
import { createCategory, deletedCategory, getCategoriesOfEvent } from '../controllers/categoryController'


const categoryRoutes = express.Router()

categoryRoutes.get('/:eventID', checkAuth, asyncHandler(getCategoriesOfEvent))

categoryRoutes.post('/:eventID', checkAuth, asyncHandler(createCategory))

categoryRoutes.delete('/:eventID/:categoryID', checkAuth, asyncHandler(deletedCategory))


export default categoryRoutes