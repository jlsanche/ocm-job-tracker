import express from 'express'
import authenticateUser from '../middleware/auth.js'

import {
    createJob,
    deleteJob,
    getAllJobs,
    showStats,
    updateJob
} from '../controllers/jobsController.js'

const router = express.Router()


router.route('/').post(authenticateUser,createJob)
router.route('/').get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)


export default router

