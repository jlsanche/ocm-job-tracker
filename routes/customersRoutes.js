import express from 'express'
import { createCustomer, updateClient, getCustomersList, getCustomerSearch } from '../controllers/customersController.js'
import authenticateUser from '../middleware/auth.js'


const router = express.Router()


router.route('/register').post(authenticateUser,createCustomer)
router.route('/updateCustomer').patch(authenticateUser,updateClient)
router.route('/search').get(authenticateUser, getCustomerSearch)
router.route('/').get(authenticateUser,getCustomersList )

export default router


