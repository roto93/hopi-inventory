import express from 'express'
import asyncHandler from 'express-async-handler'
import { checkAuth } from '../controllers/authController'
import { checkEventDataType, checkEventDataTypePartial, createEvent, deleteEvent, getEvent, getEvents, updateEvent } from '../controllers/eventController'

const eventRoutes = express.Router()

eventRoutes.get('/:id', checkAuth, asyncHandler(getEvent))

eventRoutes.get('/', checkAuth, asyncHandler(getEvents))

eventRoutes.post('/', checkAuth, checkEventDataType, asyncHandler(createEvent))

eventRoutes.patch('/:id', checkAuth, checkEventDataTypePartial, asyncHandler(updateEvent))

eventRoutes.delete('/:id', checkAuth, asyncHandler(deleteEvent))

export default eventRoutes