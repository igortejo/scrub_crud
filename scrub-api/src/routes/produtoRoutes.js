const express = require('express');
const { listarProdutosController, criarProdutoController, atualizarProdutoController, deletarProdutoController } = require('../controller/produto.js');

const router = express.Router()

router.get('/', listarProdutosController);
router.post('/', criarProdutoController);
router.put('/:id', atualizarProdutoController);
router.delete('/:id', deletarProdutoController);

module.exports = router;