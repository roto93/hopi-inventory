import { NextFunction, Request, Response } from "express"
import EventModel from "../models/EventModel"
import mongoose from "mongoose"

// TODO: This is wrong
export const checkUserHasEventFromParams = async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.user.id
  const eventID = req.params.eventID

  try {
    if (!eventID) throw Error('Event ID missing.')

    const event = await EventModel.findById(eventID)
    if (!event) throw Error('This event does not exist.')

    const index = event.userIDs.findIndex(id => id.toString() === userID)
    if (index === -1) throw Error('User do not have this event.')

    next()
  } catch (e) {
    res.status(403).json({ status: 'Failed', message: 'This event does not exist.' })
  }
}


// 是根據物件上的 eventID 判斷用戶有沒有操作他的權限，而不是根據用戶額外傳來的 eventID
export const checkUserCanOperate = async (hostEventID: mongoose.Types.ObjectId | string, userID: string) => {
  const event = await EventModel.findById(hostEventID)
  if (!event) throw Error('This event does not exist.')

  const index = event.userIDs.findIndex(id => id.toString() === userID)
  if (index === -1) throw Error('User do not have this event.')
}