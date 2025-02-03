import {listarUsuarios, criarUsuario, atualizarUsuario, deletarUsuario} from "../service/usuario"


export const listarUsuariosController = async (_, res) => {
    const usuariosLista = await listarUsuarios()
    res.send(usuariosLista)
}


export const criarUsuarioController = async (req, res) => {
    const usuarioCriado = await criarUsuario(req)
    res.status(201).json("Usuário criado com sucesso")
}

export const atualizarUsuarioController = async (req, res) => {
    const usuarioAtualizado = await atualizarUsuario(req)
    res.status(200).json("Usuário atualizado com sucesso")
}

export const deletarUsuarioController = async (req, res) => {
    const usuarioDeletado = await deletarUsuario(req)
    res.status(200).json("Usuário deletado com sucesso")
}