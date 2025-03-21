const express = require('express');
const { loginUsuarioController, getUsuarioFromTokenController, loginGerenteController, getGerenteFromTokenController } = require('../controller/auth.js');

const router = express.Router()

router.post('/cliente/login', loginUsuarioController);
router.get('/cliente/getUsuarioDetalhes', getUsuarioFromTokenController);

router.post('/gerente/login', loginGerenteController);
router.get('/gerente/getGerenteDetalhes', getGerenteFromTokenController);

module.exports = router;

