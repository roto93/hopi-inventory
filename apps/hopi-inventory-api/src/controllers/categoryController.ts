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
    const categories = await Category.find({ hostEventID: eventID })
    res.status(200).json({ status: 'Success', data: { categories } })
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


  try {
    await checkUserCanOperate(hostEventID, userID)

    // create new category
    const newCategory = await Category.create({ name, hostEventID })
    if (newCategory) console.log('Created 1 new category.')

    res.status(200).json({ status: 'Success', message: "New category created.", data: { category: newCategory } })

  } catch (e) {
    res.status(500).json({ status: 'Failed', message: e.message })

  }
}



// update category
export const updateCategory = async (req: Request, res: Response) => {
  const { categoryID, name } = req.body

  try {
    const updatedCategory = await Category.findByIdAndUpdate(categoryID, { name }, { new: true })
    res.status(200).json({ status: 'Success', data: updatedCategory })

  } catch (e) {
    console.log(e)
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}



// get categories of an event
export const deleteCategory = async (req: Request, res: Response) => {
  const userID = req.user.id
  const { categoryID } = req.body

  try {
    // check if user has right to delete this.
    const category = await Category.findById(categoryID)
    await checkUserCanOperate(category.hostEventID, userID)
    console.log('The user can delete this category')

    // delete the category by given id
    const deletedCategory = await Category.findByIdAndDelete(categoryID)
    console.log(`delete category by category id ${categoryID}`)

    res.status(200).json({ status: 'Success', message: "Category deleted.", data: { category: deletedCategory } })

  } catch (e) {
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}