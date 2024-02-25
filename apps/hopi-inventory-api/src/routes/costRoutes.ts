import express from 'express'
import asyncHandler from 'express-async-handler'
import { checkAuth } from '../controllers/authController'
import { createCost, deleteCost, getCost, getCosts, updateCost } from '../controllers/costControllers'


const costRoutes = express.Router()

costRoutes.get('/:costID', checkAuth, asyncHandler(getCost))

costRoutes.get('/', checkAuth, asyncHandler(getCosts))

costRoutes.post('/', checkAuth, asyncHandler(createCost))

costRoutes.patch('/:costID', checkAuth, asyncHandler(updateCost))

costRoutes.delete('/:costID', checkAuth, asyncHandler(deleteCost))

export default costRoutes