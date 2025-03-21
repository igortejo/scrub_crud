const Usuario = require('../model/usuario.js');
const bcrypt = require('bcrypt');

const listarUsuarios = async (req, res) => {
  try {
    return await Usuario.findAll();
  } catch (error) {
    throw new Error("Erro ao listar usuários: " + error.message);
  }
};

const criarUsuario = async (req) => {
  try {
    const { nome, email, idade, senha } = req.body;
    const usuarioExiste = await Usuario.findOne({ where: { email } });

    if (usuarioExiste) {
      throw new Error("E-mail já cadastrado!");
    }
    // Gera o hash da senha
    const senhaHash = await bcrypt.hash(senha, 10);
    const usuario = await Usuario.create({
      nome, 
      email, 
      idade, 
      senha: senhaHash 
    });
    return usuario;

  } catch (error) {
    throw new Error(error.message);
  }
};

const atualizarUsuario = async (req) => {
  try {
    const { nome, email, idade, senha } = req.body;
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if(!usuario) {
      throw new Error("Usuário não encontrado!");
    }

    await Usuario.update({
      nome,
      email,
      idade,
      senha
    }, {
      where: {
        id: id
      }
    });
    return Usuario.findByPk(id); // Retorna o usuário atualizado

  } catch (error) {
    throw new Error(error.message);
  }
};

const deletarUsuario = async (req) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      throw new Error("Usuário não encontrado!");
    }

    await Usuario.destroy({
      where: {
        id: id
      }
    });
    return usuario; 

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { listarUsuarios, criarUsuario, atualizarUsuario, deletarUsuario };