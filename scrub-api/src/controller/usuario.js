const { listarUsuarios, criarUsuario, atualizarUsuario, deletarUsuario } = require("../service/usuario.js");

const listarUsuariosController = async (_, res) => {
    const usuariosLista = await listarUsuarios();
    res.send(usuariosLista);
};

const criarUsuarioController = async (req, res) => {
    try {
      const usuarioCriado = await criarUsuario(req);
      res.status(201).json({
        message: "Usuário criado com sucesso!",
        usuario: usuarioCriado
      });
    } catch (error) {
      if (error.message === "E-mail já cadastrado!") {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Erro ao criar usuário", error: error.message });
    }
  };
  

const atualizarUsuarioController = async (req, res) => {
    try {
        const usuarioAtualizado = await atualizarUsuario(req);
        res.status(200).json({
            message: "Usuário atualizado com sucesso!",
            usuario: usuarioAtualizado  //dados enviados pelo back
        });
      } catch (error) {
        if (error.message === "Usuário não encontrado!") {
          return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Erro ao atualizar usuário", error: error.message });
      }
};

const deletarUsuarioController = async (req, res) => {
    try {
        const usuarioDeletado = await deletarUsuario(req);
        res.status(200).json({
            message: "Usuário deletado com sucesso!",
            usuario: usuarioDeletado  //dados enviados pelo back
        });
      } catch (error) {
        if (error.message === "Usuário não encontrado!") {
          return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: "Erro ao deletar usuário", error: error.message });
      }
};

module.exports = { listarUsuariosController, criarUsuarioController, atualizarUsuarioController, deletarUsuarioController };
