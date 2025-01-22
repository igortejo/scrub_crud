import {listarUsuarios, criarUsuario, atualizarUsuario, deletarUsuario} from "../service/usuario"


export const listarUsuariosController = async (req, res) => {
    const usuariosLista = await listarUsuarios()
    res.send(usuariosLista)
}

export const criarUsuarioController = async (req, res) => {
    const usuarioCriado = await criarUsuario(req.body)
    res.status(201).send(usuarioCriado)
}

export const atualizarUsuarioController = async (req, res) => {
    const usuarioAtualizado = await atualizarUsuario(req.params.id, req.body)
    res.send(usuarioAtualizado)
}

export const deletarUsuarioController = async (req, res) => {
    const usuarioDeletado = await deletarUsuario(req.params.id)
    res.status(201).send(usuarioDeletado)
}

// router.get('/', async (req, res) => {
//     const usuariosLista = await listarUsuarios()
//     res.send(usuariosLista)
// })

// router.post('/', async (req, res) => {
//     const usuarioCriado = await criarUsuario(req.body)
//     res.status(201).send(usuarioCriado)
// })

// router.put('/:id', async (req, res) => {
//     const usuarioAtualizado = await atualizarUsuario(req.params.id, req.body)
//     res.send(usuarioAtualizado)
// })

// router.delete('/:id', async (req, res) => {
//     const usuarioDeletado = await deletarUsuario(req.params.id)
//     res.status(201).send(usuarioDeletado)

// })

// export default router