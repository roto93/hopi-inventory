import { Request, Response } from 'express'
import Product from '../models/ProductModel'
import { checkUserCanOperate } from './utils'



// get a product
export const getProduct = async (req: Request, res: Response) => {
  const userID = req.user.id
  const productID = req.params.productID

  try {
    const product = await Product.findById(productID)
    const hostEventID = product.hostEventID
    await checkUserCanOperate(hostEventID, userID)

    res.status(200).json({ status: 'Success', data: { product } })
  } catch (e) {
    console.log(e)
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}



// get all products of an event
export const getProducts = async (req: Request, res: Response) => {
  const eventID = req.params.eventID

  try {
    const products = await Product.find({ hostEventID: eventID })
    res.status(200).json({ status: 'Success', data: { products } })
  } catch (e) {
    console.log(e)
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}



// create a product
export const createProduct = async (req: Request, res: Response) => {
  const userID = req.user.id
  const { hostEventID, name, inventory, soldQuantity, price, image, categoryID } = req.body

  try {
    await checkUserCanOperate(hostEventID, userID)

    const newProduct = await Product.create({
      hostEventID,
      name,
      inventory,
      soldQuantity,
      price,
      image,
      categoryID,
    })
    if (newProduct) console.log('Created 1 new product.')

    res.status(200).json({ status: 'Success', data: { product: newProduct } })
  } catch (e) {
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}



// update a product 
export const udpateProduct = async (req: Request, res: Response) => {
  const userID = req.user.id
  const { productID } = req.params
  const { name, inventory, soldQuantity, price, image, categoryID, } = req.body

  try {
    // check if user has right to delete this
    const product = await Product.findById(productID)
    await checkUserCanOperate(product.hostEventID, userID)
    console.log('The user can delete this product')

    const updatedCost = await Product.findByIdAndUpdate(productID, {
      name,
      inventory,
      soldQuantity,
      price,
      image,
      categoryID,
    }, { new: true })
    if (updatedCost) console.log('Updated 1 product.')

    res.status(200).json({ status: 'Success', data: { product: updatedCost } })
  } catch (e) {
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}



// delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  const userID = req.user.id
  const { productID } = req.params

  try {
    // check if user has right to delete this
    const product = await Product.findById(productID)
    await checkUserCanOperate(product.hostEventID, userID)
    console.log('The user can delete this product')

    // delete the product by given id
    const deletedCost = await Product.findByIdAndDelete(productID)
    console.log(`delete product by category id ${productID}`)
    res.status(200).json({ status: 'Success', message: "Category deleted.", data: { category: deletedCost } })

  } catch (e) {
    res.status(500).json({ status: 'Failed', message: e.message })
  }
}