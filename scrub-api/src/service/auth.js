import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/index';
const  Usuario  = require('../model/usuario');
import { database } from "../config/database"


export const loginUsuario = async(email, senha) => {
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

export const getUsuarioFromToken = async (token) => {
    try {
        const trimmedToken = token.trim(); //eliminar espaços vazios
        const decodedToken = await jwt.verify(trimmedToken, config.JWT_KEY) //retorna o payload com os dados do usuario que estao no token que utilizei para criar o token (email e id)
        const [registros] = await db.query(`SELECT id, email, nome FROM usuarios WHERE email=?`, [decodedToken.email])  //busco o registro com esse email que foi pego no token

        if (registros.length === 0) {
            return {success: false, message: "Usuário não encontrado"}
        }
        return {success:true, data:registros[0]}

    } catch (error) {
        return {success: false, message: "Token Inválido!", error:error}
    }
}

export const loginGerente = async(email, senha) => {
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
        // primeiro argumento normalmente é o id do usario
        //o segundo é a nossa chave criado no config
        // o terceiro é o tempo que aquele token será expirado
        const token = jwt.sign(  
            {id:usuario.id, email: usuario.email},
            config.JWT_KEY,
            {expiresIn: '1h'}
        )
    
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

export const getGerenteFromToken = async (token) => {
    try {
        const trimmedToken = token.trim(); //eliminar espaços vazios
        const decodedToken = await jwt.verify(trimmedToken, config.JWT_KEY) //retorna o payload com os dados do usuario que estao no token que utilizei para criar o token (email e id)
        const [registros] = await db.query(`SELECT id, email, nome FROM usuarios WHERE email=?`, [decodedToken.email])  //busco o registro com esse email que foi pego no token

        if (registros.length === 0) {
            return {success: false, message: "Usuário não encontrado"}
        }
        return {success:true, data:registros[0]}

    } catch (error) {
        return {success: false, message: "Token Inválido!", error:error}
    }
}