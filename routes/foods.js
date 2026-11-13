import express from 'express'
import foodController from '../controllers/foods.js'

const router = express.Router()

router.get("/foods", foodController.foods );

export default router
