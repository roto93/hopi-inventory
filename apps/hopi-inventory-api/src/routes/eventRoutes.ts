import express from 'express'
import asyncHandler from 'express-async-handler'
import { checkAuth } from '../controllers/authController'
import { checkEventDataType, checkEventDataTypePartial, createEvent, deleteEvent, getEvent, getEvents, updateEvent } from '../controllers/eventController'
import { checkUserHasEventFromParams } from '../controllers/utils'

const eventRoutes = express.Router()

eventRoutes.get('/:eventID', checkAuth, checkUserHasEventFromParams, asyncHandler(getEvent))

eventRoutes.get('/', checkAuth, asyncHandler(getEvents))

eventRoutes.post('/', checkAuth, checkEventDataType, asyncHandler(createEvent))

eventRoutes.patch('/:eventID', checkAuth, checkUserHasEventFromParams, checkEventDataTypePartial, asyncHandler(updateEvent))

eventRoutes.delete('/:eventID', checkAuth, checkUserHasEventFromParams, asyncHandler(deleteEvent))

export default eventRoutes