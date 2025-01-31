import jwt from "jsonwebtoken";
import config from "../config/index"

export const authenticateUserController = async (req, res, next) => {
    const {email, password} = req.body.userData;

    if (email === undefined || password === undefined) {
        res.status(401).json("Email ou Senha inválido")
    } else {
        let tokenData = {
            id:101
        }
        // primeiro argumento normalmente é o id do usario
        // o segundo é a nossa chave criado no config
        // o terceiro é o tempo que aquele token será expirado
        let generatedToken = jwt.sign(tokenData, config.JWT_KEY, {expiresIn: '1m'});  //gerar o token
        res.json("token: " + generatedToken)
    }
}