import express from 'express'
import { loginUsuarioController, getUsuarioFromTokenController } from '../controller/auth';

const router = express.Router()

router.post('/cliente/login', loginUsuarioController);
router.get('/cliente/getUsuarioDetalhes', getUsuarioFromTokenController);


export default router