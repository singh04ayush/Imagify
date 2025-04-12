import express from 'express'
import { generateImage, getUserGenerations, getGeneration } from '../controllers/imageControllers.js'
import userAuth from '../middlewares/auth.js'

const imageRouter = express.Router()

imageRouter.post('/generate-image', userAuth, generateImage)
imageRouter.get('/user-generations', userAuth, getUserGenerations)
imageRouter.get('/generation/:id', userAuth, getGeneration)

export default imageRouter;