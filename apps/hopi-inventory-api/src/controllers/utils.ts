import { NextFunction, Request, Response } from "express"
import EventModel from "../models/EventModel"

export const checkUserHasEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userID = req.user.id
    const eventID = req.body.eventID
    const event = await EventModel.findById(eventID)
    const index = event.userIDs.findIndex(id => id.toString() === userID)
    if (index === -1) throw Error('User do not have this event.')
    next()
  } catch (e) {
    res.status(403).json({ status: 'Failed', message: 'This event does not exist.' })
  }
}
export const checkUserHasEventFromParams = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userID = req.user.id
    const eventID = req.params.eventID
    const event = await EventModel.findById(eventID)
    const index = event.userIDs.findIndex(id => id.toString() === userID)
    if (index === -1) throw Error('User do not have this event.')
    next()
  } catch (e) {
    res.status(403).json({ status: 'Failed', message: 'This event does not exist.' })
  }
}