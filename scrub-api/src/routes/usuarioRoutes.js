const express = require('express');
const { listarUsuariosController, criarUsuarioController, atualizarUsuarioController, deletarUsuarioController } = require('../controller/usuario.js');

const router = express.Router()

router.get('/', listarUsuariosController);
router.post('/', criarUsuarioController);
router.put('/:id', atualizarUsuarioController);
router.delete('/:id', deletarUsuarioController);

module.exports = router;