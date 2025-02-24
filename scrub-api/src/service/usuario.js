const  Usuario  = require('../model/usuario');

export const listarUsuarios = async (req, res) => {
  try {
    return await Usuario.findAll();
} catch (error) {
    throw new Error("Erro ao listar usuários: " + error.message);
}
};

export const criarUsuario = async (req) => {
  try {
    const { nome, email, idade, senha } = req.body;
    const usuario = await Usuario.create({
         nome, 
         email, 
         idade, 
         senha 
        });
    return usuario;
} catch (error) {
    throw new Error("Erro ao criar usuário: " + error.message);
} 
};

export const atualizarUsuario = async (req) => {
  try {
    const { nome, email, idade, senha } = req.body;
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (usuario) {
      const usuario = await Usuario.update({
        nome,
        email,
        idade,
        senha
      }, {
        where: {
          id: id
        }
      })
    } 
    return usuario;
  } catch (error) {
    throw new Error("Erro ao atualizar usuário: " + error.message);
  }
};

export const deletarUsuario = async (req) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (usuario) {
      const usuario = await Usuario.destroy({
        where: {
          id: id
        }
      });
    }
    return usuario;
  } catch (error) {
    throw new Error("Erro ao deletar usuário: " + error.message);
  }
};