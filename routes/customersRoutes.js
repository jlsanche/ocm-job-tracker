import express from 'express'
import { createCustomer, updateClient, getClientsAndJobs, getClientList } from '../controllers/customersController.js'
import authenticateUser from '../middleware/auth.js'


const router = express.Router()


router.route('/register').post(authenticateUser,createCustomer)
router.route('/updateCustomer').patch(authenticateUser,updateClient)
router.route('/:search').get(authenticateUser, getClientList)
router.route('/').get(authenticateUser, getClientsAndJobs)

export default router


