import jwt from 'jsonwebtoken';
import config from '../config/index';
import { db } from "../db";


export const loginUsuario = async(email, password) => {
    try {
        const [registros] = await db.query(`SELECT * FROM usuarios WHERE email=?`, [email]); //retorna um array com os registros
        if (registros.length === 0) { //significa que nao achou nenhum registro
            return {success: false, message: "Usuário não encontrado"}
        }
        const usuario = registros[0] //pega so o primeiro registro

        if (password !== usuario.password) { //senha vinda do front e vinda do banco respectivamente
            return {success: false, message: "Senha inválida!"}
        }

        // const senhaMatch = await bcrypt.compare(password, usuario.password) //senha vinda do front e vinda do banco respectivamente
        // if(!senhaMatch) {
        //     return {success: false, message: "Senha inválida!"}
        // }

        // primeiro argumento normalmente é o id do usario
        // o segundo é a nossa chave criado no config
        // o terceiro é o tempo que aquele token será expirado
        const token = jwt.sign(    //criação do token
            {id:usuario.id, email: usuario.email},
            config.JWT_KEY,
            {expiresIn: '1h'}
        )
        
        return {
            success: true,
            message: "Sucesso ao fazer Login!",
            token: token
        }

    } catch (error) {
        return {success: false, message: "Falha ao fazer Login, tente novamente!"}
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