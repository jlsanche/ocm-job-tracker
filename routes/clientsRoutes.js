import express from 'express'
import { createClient, updateClient, getClientsAndJobs, getClientList } from '../controllers/clientsController.js'
import authenticateUser from '../middleware/auth.js'


const router = express.Router()


router.route('/register').post(authenticateUser,createClient)
router.route('/updateClient').patch(authenticateUser,updateClient)
router.route('/:search').get(authenticateUser, getClientList)
router.route('/').get(authenticateUser, getClientsAndJobs)

export default router


