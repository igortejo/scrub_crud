const express = require('express');
const { listarPedidosController, criarPedidoController, atualizarPedidoController, deletarPedidoController } = require('../controller/pedido.js');

const router = express.Router()

router.get('/', listarPedidosController);
router.post('/', criarPedidoController);
router.put('/:id', atualizarPedidoController);
router.delete('/:id', deletarPedidoController);

module.exports = router;
