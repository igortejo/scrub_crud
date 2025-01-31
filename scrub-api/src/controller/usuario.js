import {listarUsuarios, criarUsuario, atualizarUsuario, deletarUsuario} from "../service/usuario"


export const listarUsuariosController = async (req, res) => {
    const usuariosLista = await listarUsuarios()
    res.send(usuariosLista)
}

export const criarUsuarioController = async (req, res) => {
    const usuarioCriado = await criarUsuario(req.body, res)
    res.status(201).json("Usuário criado com sucesso")
}

export const atualizarUsuarioController = async (req, res) => {
    const usuarioAtualizado = await atualizarUsuario(req.params.id, req.body)
    res.status(200).json("Usuário atualizado com sucesso")
}

export const deletarUsuarioController = async (req, res) => {
    const usuarioDeletado = await deletarUsuario(req.params.id)
    res.status(200).json("Usuário deletado com sucesso")
}