import { NextFunction, Request, Response } from 'express'
import Event from '../models/EventModel'
import User from '../models/UserModel'


// get single event
export const getEvent = async (req: Request, res: Response) => {
  const eventID = req.params.id
  try {
    const event = await Event.findById(eventID)
    res.status(200).json({ status: 'Success', data: { event } })
  } catch (e) {
    console.log(e)
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}


// get event list of the user
export const getEvents = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id)
    await user.populate('eventIDs')
    res.status(200).json({ status: 'Success', data: { events: user.eventIDs } })
  } catch (e) {
    console.log(e)
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}


// create event
export const createEvent = async (req: Request, res: Response) => {
  const user = req.user
  const { name, startDate, endDate, image } = req.body as { [name: string]: unknown }

  // check duplicate
  const matchEvents = await Event.find({ name })
  const isDuplicate = matchEvents.some(event => (
    event.userIDs.some(id => id.toString() === user.id)
  ))
  if (isDuplicate) {
    res.status(400).json({ status: 'Failed', message: 'Event name exists. Try another name.' })
    return
  }

  const session = await Event.startSession()
  session.startTransaction()
  try {
    // create new event
    const newEvent = await Event.create([{ name, userIDs: user.id, startDate, endDate, image }], { session })

    // add new event to user
    const newUser = await User.findByIdAndUpdate(
      user.id,
      { $push: { eventIDs: newEvent[0].id } },
      { session, new: true }
    )

    if (!newUser) {
      await session.abortTransaction()
      throw new Error(`User with ID ${user.id} not found.`);
    }

    await session.commitTransaction();
    res.status(200).json({ status: 'Success', message: 'New event created.', data: { event: newEvent } })
  } catch (e) {
    console.log(e)
    await session.abortTransaction()
    res.status(500).json({ status: 'Failed', message: e.message })
  } finally {
    await session.endSession()
  }
}


// update event
export const updateEvent = async (req: Request, res: Response) => {
  const eventID = req.params.id
  const { name, startDate, endDate, image } = req.body

  try {
    const deletedEvent = await Event.findByIdAndUpdate(
      eventID,
      { name, startDate, endDate, image },
      { new: true }
    )
    res.status(200).json({ status: 'Success', message: 'Event updated.', data: { event: deletedEvent } })

  } catch (e) {
    console.log(e)
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}


// delete event
export const deleteEvent = async (req: Request, res: Response) => {
  const eventID = req.params.id

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventID)
    res.status(200).json({ status: 'Success', message: 'Event deleted.', data: { event: deletedEvent } })

  } catch (e) {
    console.log(e)
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}


// check data types middleware
export const checkEventDataType = (req: Request, res: Response, next: NextFunction) => {
  const { name, startDate, endDate, image } = req.body

  if (
    !name || typeof name !== 'string' ||
    !startDate || typeof startDate !== 'string' ||
    !endDate || typeof endDate !== 'string' ||
    (image && typeof image !== 'string')
  ) {
    res.status(400).json({ status: 'Failed', message: 'Wrong data type.' })
    return
  }
  next()
}
// check data types middleware
export const checkEventDataTypePartial = (req: Request, res: Response, next: NextFunction) => {
  const { name, startDate, endDate, image } = req.body

  if (
    (name && typeof name !== 'string') ||
    (startDate && typeof startDate !== 'string') ||
    (endDate && typeof endDate !== 'string') ||
    (image && typeof image !== 'string')
  ) {
    res.status(400).json({ status: 'Failed', message: 'Wrong data type.' })
    return
  }
  next()
}