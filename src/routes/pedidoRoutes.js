import express from 'express'
import {listarPedidosController, criarPedidoController, atualizarPedidoController, deletarPedidoController} from '../controller/pedido'

const router = express.Router()

router.get('/', listarPedidosController);
// router.get('/', pedidoUsusarioController);
router.post('/', criarPedidoController);
router.put('/:id', atualizarPedidoController);
router.delete('/:id', deletarPedidoController);


export default router