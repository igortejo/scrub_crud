import {listarUsuarios, criarUsuario, atualizarUsuario, deletarUsuario} from "../service/usuario"


export const listarUsuariosController = async (_, res) => {
    const usuariosLista = await listarUsuarios()
    res.send(usuariosLista)
}

export const criarUsuarioController = async (req, res) => {
    const usuarioCriado = await criarUsuario(req)
    res.status(201).json("Usuário criado com sucesso")
}

export const atualizarUsuarioController = async (req,res) => {
    const usuarioAtualizado = await atualizarUsuario(req)
    if (usuarioAtualizado != null) {
        res.status(200).json("Usuário atualizado com sucesso")
    } else {
        res.status(404).json("Usuário não encontrado")
    }
}

export const deletarUsuarioController = async (req, res) => {
    const usuarioDeletado = await deletarUsuario(req)
    if (usuarioDeletado != null) {
        res.status(200).json("Usuário deletado com sucesso")
    } else {
        res.status(404).json("Usuário não encontrado")
    }
}