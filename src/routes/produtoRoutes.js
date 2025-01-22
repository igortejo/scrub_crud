import express from 'express'
import {listarProdutosController, criarProdutoController, atualizarProdutoController, deletarProdutoController} from '../controller/produto'


const router = express.Router()

router.get('/', listarProdutosController);
router.post('/', criarProdutoController);
router.put('/:id', atualizarProdutoController);
router.delete('/:id', deletarProdutoController);

export default router