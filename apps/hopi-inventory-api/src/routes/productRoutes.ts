import express from 'express'
import asyncHandler from 'express-async-handler'
import { checkAuth } from '../controllers/authController'
import { createProduct, deleteProduct, getProduct, getProducts, udpateProduct } from '../controllers/productController'


const productRoutes = express.Router()

productRoutes.get('/:productID', checkAuth, asyncHandler(getProduct))

productRoutes.get('/', checkAuth, asyncHandler(getProducts))

productRoutes.post('/', checkAuth, asyncHandler(createProduct))

productRoutes.patch('/:productID', checkAuth, asyncHandler(udpateProduct))

productRoutes.delete('/:productID', checkAuth, asyncHandler(deleteProduct))

export default productRoutes