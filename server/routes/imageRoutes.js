import express from 'express'
import {generateImage} from '../controllers/imageControllers.js'
import userAuth from '../middlewares/auth.js'



const imageRouter = express.Router()

imageRouter.post('/generate-image', userAuth, generateImage)

export default imageRouter;