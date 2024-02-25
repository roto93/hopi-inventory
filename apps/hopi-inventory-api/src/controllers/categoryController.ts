import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Category from '../models/CategoryModel'
import Event from '../models/EventModel'
import { checkUserCanOperate } from './utils'



// get a category
export const getCategory = async (req: Request, res: Response) => {
  const userID = req.user.id
  const categoryID = req.params.categoryID

  try {
    const category = await Category.findById(categoryID)
    const hostEventID = category.hostEventID
    await checkUserCanOperate(hostEventID, userID)

    res.status(200).json({ status: 'Success', data: { category } })
  } catch (e) {
    console.log(e)
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}



// get categories of an event
export const getCategoriesOfEvent = async (req: Request, res: Response) => {
  const eventID = req.body.eventID

  try {
    const event = await Event.findById(eventID).populate('categoryIDs')
    res.status(200).json({ status: 'Success', data: { categories: event.categoryIDs } })
  } catch (e) {
    console.log(e)
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}



// create category
export const createCategory = async (req: Request, res: Response) => {
  const userID = req.user.id
  const { name, hostEventID } = req.body


  // check data type
  if (!name || typeof name !== 'string' || !hostEventID || typeof hostEventID !== 'string') {
    res.status(400).json({ status: 'Failed', message: 'Wrong data type.' })
    return
  }

  await checkUserCanOperate(hostEventID, userID)

  const session = await Event.startSession()
  session.startTransaction()

  try {
    // create new category
    const newCategory = await Category.create([{ name, hostEventID }], { session })
    if (newCategory) console.log('Created 1 new category.')

    // add new category to event
    const newEvent = await Event.findByIdAndUpdate(
      hostEventID,
      { $push: { categoryIDs: newCategory[0].id } },
      { new: true, session }
    )

    if (!newEvent) {
      await session.abortTransaction()
      res.status(400).json({ status: 'Failed', message: 'The creation is internally aborted.' })
      return
    }
    console.log('Added new category to event.')

    await session.commitTransaction()
    console.log('Transaction Finished without error.')
    res.status(200).json({ status: 'Success', message: "New category created.", data: { category: newCategory } })

  } catch (e) {
    session.abortTransaction()
    console.log('Transaction aborted', e)
    res.status(500).json({ status: 'Failed', message: e.message })

  } finally {
    session.endSession()
  }
}



// update category
export const updateCategory = async (req: Request, res: Response) => {
  const { categoryID, name, costIDs, productIDs } = req.body

  try {
    const updatedCategory = await Category.findByIdAndUpdate(categoryID, {
      name,
      costIDs,
      productIDs,
    }, { new: true })
    res.status(200).json({ status: 'Success', data: updatedCategory })

  } catch (e) {
    console.log(e)
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}



// get categories of an event
export const deletedCategory = async (req: Request, res: Response) => {
  const userID = req.user.id
  const { categoryID } = req.body

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // delete the category by given id
    const deletedCategory = await Category.findByIdAndDelete(
      categoryID,
      { session }
    )

    if (!deletedCategory) {
      await session.abortTransaction()
      const message = `Category with ID ${categoryID} not found.`
      console.log(message)
      res.status(400).json({ status: "Failed", message })
      return
    }
    console.log(`delete category by category id ${categoryID}`)

    await checkUserCanOperate(deletedCategory.hostEventID, userID)
    console.log('The user can delete this category')

    // remove the category id from corresponding event
    const updatedEvent = await Event.findByIdAndUpdate(
      deletedCategory.hostEventID,
      { $pull: { categoryIDs: deletedCategory.id } },
      { session }
    )

    if (!updatedEvent) {
      await session.abortTransaction()
      const message = `Event with ID ${deletedCategory.hostEventID} not found.`
      console.log(message)
      res.status(400).json({ status: "Failed", message })
      return
    }
    console.log(`Removed category id ${categoryID} from event ${deletedCategory.hostEventID}`)

    await session.commitTransaction()
    console.log('Transaction Finished without error.')
    res.status(200).json({ status: 'Success', message: "Category deleted.", data: { category: deletedCategory } })

  } catch (e) {
    console.log(e)
    await session.abortTransaction()
    res.status(500).json({ status: 'Failed', message: e.message })
  } finally {
    await session.endSession()
  }
}