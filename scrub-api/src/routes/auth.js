import express from 'express'
import { authenticateUserController } from '../controller/auth'; "../controller/auth"

const router = express.Router()

router.post('/login', authenticateUserController);


export default router