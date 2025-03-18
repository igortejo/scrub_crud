import express from 'express'
import {listarUsuariosController, criarUsuarioController, atualizarUsuarioController, deletarUsuarioController} from '../controller/usuario.js'


const router = express.Router()

router.get('/', listarUsuariosController);
router.post('/', criarUsuarioController);
router.put('/:id', atualizarUsuarioController);
router.delete('/:id', deletarUsuarioController);

export default router