import { Request, Response } from 'express'
import TxModel from '../models/TxModel'
import Product from '../models/ProductModel'
import { checkUserCanOperate } from './utils'
import mongoose, { ClientSession } from 'mongoose'



// get a transaction
export const getTx = async (req: Request, res: Response) => {
  const userID = req.user.id
  const txID = req.params.txID

  try {
    const Tx = await TxModel.findById(txID)
    if (!Tx) throw Error('The transaction does not exist.')

    const hostEventID = Tx.hostEventID
    await checkUserCanOperate(hostEventID, userID)

    res.status(200).json({ status: 'Success', data: { Tx } })
  } catch (e) {
    console.log(e)
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}



// get all transactions of an event 
export const getTxes = async (req: Request, res: Response) => {
  const eventID = req.body.eventID

  try {
    const Txes = await TxModel.find({ hostEventID: eventID })
    res.status(200).json({ status: 'Success', data: { Txes } })
  } catch (e) {
    console.log(e)
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}



// create a transaction
export const createTx = async (req: Request, res: Response) => {
  const userID = req.user.id
  const { hostEventID, orders } = req.body

  const session = await TxModel.startSession()
  session.startTransaction()

  try {
    await checkUserCanOperate(hostEventID, userID)

    // create a new transaction
    const Tx = await createTxAction(hostEventID, orders, session)

    await session.commitTransaction();
    res.status(200).json({ status: 'Success', data: { Tx } })
  } catch (e) {
    console.log(e)
    await session.abortTransaction()
    res.status(500).json({ status: 'Failed', message: e.message })
  } finally {
    await session.endSession()
  }
}



// update a transaction
export const updateTx = async (req: Request, res: Response) => {
  const userID = req.user.id
  const txID = req.params.txID
  const { orders } = req.body

  const session = await TxModel.startSession()
  session.startTransaction()

  try {
    const Tx = await TxModel.findById(txID)
    await checkUserCanOperate(Tx.hostEventID, userID)

    // delete the transaction them modify the product inventory data
    const deletedTx = await deleteTxAction(txID, session)

    // create a new transaction
    const newTx = await createTxAction(deletedTx.hostEventID, orders, session)

    await session.commitTransaction();
    res.status(200).json({ status: 'Success', data: { Tx: newTx } })
  } catch (e) {
    console.log(e)
    await session.abortTransaction()
    res.status(500).json({ status: 'Failed', message: e.message })
  } finally {
    await session.endSession()
  }
}



// delete a transaction
export const deleteTx = async (req: Request, res: Response) => {
  const userID = req.user.id
  const txID = req.params.txID

  const session = await TxModel.startSession()
  session.startTransaction()

  try {
    const Tx = await TxModel.findById(txID)
    await checkUserCanOperate(Tx.hostEventID, userID)

    // delete the transaction them modify the product inventory data
    const deletedTx = await deleteTxAction(txID, session)

    await session.commitTransaction();
    res.status(200).json({ status: 'Success', data: { Tx: deletedTx } })
  } catch (e) {
    console.log(e)
    await session.abortTransaction()
    res.status(500).json({ status: 'Failed', message: e.message })
  } finally {
    await session.endSession()
  }
}



const deleteTxAction = async (txID: string, session: ClientSession) => {
  // delete original transaction
  const deletedTx = await TxModel.findByIdAndDelete(txID, { session })
  if (deletedTx) console.log('Deleted 1 transaction.')

  //根據刪除的 orders 回復庫存數量
  const promises1 = deletedTx.orders.map(async (order: any) => {
    const { productID, quantity } = order
    const newProduct = await Product.findOneAndUpdate(
      { _id: productID },
      { $inc: { inventory: quantity, soldQuantity: -quantity } }, // schema會自動檢查soldQuantity不可小於零
      { session, runValidators: true, new: true }
    )
    await newProduct.validate()
  })
  const results1 = await Promise.all(promises1)
  console.log(results1)

  return deletedTx
}



const createTxAction = async (hostEventID: mongoose.Types.ObjectId, orders: any, session: ClientSession) => {
  // create a new transaction
  const Tx = await TxModel.create([{ hostEventID, orders }], { session })
  if (Tx) console.log('Created 1 transaction')

  //根據orders改變庫存數量
  const promises = orders.map(async (order: any) => {
    const { productID, quantity } = order
    const result = await Product.findOneAndUpdate(
      { _id: productID },
      { $inc: { inventory: -quantity, soldQuantity: quantity } }, // schema會自動檢查inventory不可小於零
      { session, runValidators: true, new: true }
    )
    await result.validate()
  })
  const results = await Promise.all(promises)
  console.log(results)

  return Tx
}