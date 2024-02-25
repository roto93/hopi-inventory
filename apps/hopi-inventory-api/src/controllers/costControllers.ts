import { Request, Response } from 'express'
import Cost from '../models/CostModel'
import { checkUserCanOperate } from './utils'



// get a cost
export const getCost = async (req: Request, res: Response) => {
  const userID = req.user.id
  const costID = req.params.costID

  try {
    const cost = await Cost.findById(costID)
    const hostEventID = cost.hostEventID
    await checkUserCanOperate(hostEventID, userID)

    res.status(200).json({ status: 'Success', data: { cost } })
  } catch (e) {
    console.log(e)
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}



// get all costs of an event
export const getCosts = async (req: Request, res: Response) => {
  const eventID = req.body.eventID

  try {
    const costs = await Cost.find({ hostEventID: eventID })
    res.status(200).json({ status: 'Success', data: { costs } })
  } catch (e) {
    console.log(e)
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}



// create a cost
export const createCost = async (req: Request, res: Response) => {
  const userID = req.user.id
  const { name, amount, image, hostEventID, totalPrice, categoryID } = req.body

  try {
    await checkUserCanOperate(hostEventID, userID)

    const newCost = await Cost.create({
      name,
      amount,
      image,
      hostEventID,
      totalPrice,
      categoryID
    })
    if (newCost) console.log('Created 1 new cost.')

    res.status(200).json({ status: 'Success', data: { cost: newCost } })
  } catch (e) {
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}



// update a cost 
export const updateCost = async (req: Request, res: Response) => {
  const userID = req.user.id
  const { costID } = req.params
  const { name, amount, image, totalPrice, categoryID } = req.body

  try {
    // check if user has right to delete this
    const cost = await Cost.findById(costID)
    await checkUserCanOperate(cost.hostEventID, userID)
    console.log('The user can delete this cost')

    const updatedCost = await Cost.findByIdAndUpdate(costID, {
      name,
      amount,
      image,
      totalPrice,
      categoryID
    }, { new: true })
    if (updatedCost) console.log('Updated 1 cost.')

    res.status(200).json({ status: 'Success', data: { cost: updatedCost } })
  } catch (e) {
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}



// delete a cost
export const deleteCost = async (req: Request, res: Response) => {
  const userID = req.user.id
  const { costID } = req.params

  try {
    // check if user has right to delete this
    const cost = await Cost.findById(costID)
    await checkUserCanOperate(cost.hostEventID, userID)
    console.log('The user can delete this cost')

    // delete the cost by given id
    const deletedCost = await Cost.findByIdAndDelete(costID)
    console.log(`delete cost by cost id ${costID}`)
    res.status(200).json({ status: 'Success', message: "Cost deleted.", data: { category: deletedCost } })

  } catch (e) {
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}