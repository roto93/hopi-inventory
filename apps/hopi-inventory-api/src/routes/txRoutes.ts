import express from 'express'
import asyncHandler from 'express-async-handler'
import { checkAuth } from '../controllers/authController'
import { createTx, deleteTx, getTx, getTxes, updateTx } from '../controllers/txController'


const TxRoutes = express.Router()

TxRoutes.get('/:txID', checkAuth, asyncHandler(getTx))

TxRoutes.get('/', checkAuth, asyncHandler(getTxes))

TxRoutes.post('/', checkAuth, asyncHandler(createTx))

TxRoutes.patch('/:txID', checkAuth, asyncHandler(updateTx))

TxRoutes.delete('/:txID', checkAuth, asyncHandler(deleteTx))

export default TxRoutes