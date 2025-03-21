const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/index.js');
const Usuario = require('../model/usuario.js');

const loginUsuario = async (email, senha) => {
    try {
        // Busca um usuário pelo e-mail
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return { success: false, message: "Usuário não encontrado" };
        }

        // Verifica se a senha informada bate com a armazenada no banco
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) { // usar bcrypt para comparar senhas criptografadas
            return { success: false, message: "Senha inválida!" };
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            config.JWT_KEY,
            { expiresIn: "1h" }
        );

        return {
            success: true,
            message: "Sucesso ao fazer Login!",
            token: token
        };

    } catch (error) {
        console.error(error); // Ajuda a depurar erros
        return { success: false, message: "Falha ao fazer Login, tente novamente!" };
    }
}

const getUsuarioFromToken = async (token) => {
    try {
        const trimmedToken = token.trim(); //eliminar espaços vazios
        const decodedToken = await jwt.verify(trimmedToken, config.JWT_KEY); //retorna o payload com os dados do usuario que estao no token

        const [registros] = await db.query(`SELECT id, email, nome FROM usuarios WHERE email=?`, [decodedToken.email]);  //busco o registro com esse email que foi pego no token

        if (registros.length === 0) {
            return { success: false, message: "Usuário não encontrado" }
        }
        return { success: true, data: registros[0] }

    } catch (error) {
        return { success: false, message: "Token Inválido!", error: error }
    }
}

const loginGerente = async (email, senha) => {
    try {
        // Busca um gerente pelo e-mail
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return { success: false, message: "Gerente não encontrado" };
        }

        // Verifica se a senha informada bate com a armazenada no banco
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) { // usar bcrypt para comparar senhas criptografadas
            return { success: false, message: "Senha inválida!" };
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            config.JWT_KEY,
            { expiresIn: '1h' }
        );

        return {
            success: true,
            message: "Sucesso ao fazer Login!",
            token: token
        };

    } catch (error) {
        console.error(error); // Ajuda a depurar erros
        return { success: false, message: "Falha ao fazer Login, tente novamente!" };
    }
}

const getGerenteFromToken = async (token) => {
    try {
        const trimmedToken = token.trim(); //eliminar espaços vazios
        const decodedToken = await jwt.verify(trimmedToken, config.JWT_KEY); //retorna o payload com os dados do usuario que estao no token

        const [registros] = await db.query(`SELECT id, email, nome FROM usuarios WHERE email=?`, [decodedToken.email]);  //busco o registro com esse email que foi pego no token

        if (registros.length === 0) {
            return { success: false, message: "Usuário não encontrado" }
        }
        return { success: true, data: registros[0] }

    } catch (error) {
        return { success: false, message: "Token Inválido!", error: error }
    }
}

module.exports = { 
    loginUsuario, 
    getUsuarioFromToken, 
    loginGerente, 
    getGerenteFromToken 
};