import express from 'express'

import {
    createJob,
    deleteJob,
    getAllJobs,
    showStats,
    updateJob
} from '../controllers/jobsController.js'

const router = express.Router()


router.route('/:client').post(createJob)
router.route('/').get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob)


export default router

