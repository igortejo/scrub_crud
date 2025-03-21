const { loginUsuario, getUsuarioFromToken, loginGerente, getGerenteFromToken } = require("../service/auth.js");

const loginUsuarioController = async (req, res) => {
    try {        
        const { email, senha } = req.body;
        if (!email || !senha) {
            console.log("cheguei nos campos");
            return res.status(400).json("Preencha todos os campos!");
        }
        const response = await loginUsuario(email, senha);

        if (response.success) {
            return res.status(200).json(response); // Sucesso no login
        } else {
            return res.status(401).json(response); // Unauthorized
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "Login falhou" });
    }
};

const getUsuarioFromTokenController = async (req, res) => {
    // o token vai ser enviado através do header da requisição
    const token = req.headers.authorization.split(' ')[1];  

    if (!token) {
        return res.status(401).json({ success: false, message: "Token não fornecido" });
    }
    
    try {
        const response = await getUsuarioFromToken(token);

        if (response.success) {
            return res.status(200).json(response); // Sucesso no login
        } else {
            return res.status(401).json(response); // Unauthorized
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "Falha ao recuperar dados" });
    }
};

const loginGerenteController = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json("Preencha todos os campos!");
        }
        const response = await loginGerente(email, senha);

        if (response.success) {
            return res.status(200).json(response); // Sucesso no login
        } else {
            return res.status(401).json(response); // Unauthorized
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "Login falhou" });
    }
};

const getGerenteFromTokenController = async (req, res) => {
    // o token vai ser enviado através do header da requisição
    const token = req.headers.authorization.split(' ')[1];  

    if (!token) {
        return res.status(401).json({ success: false, message: "Token não fornecido" });
    }
    
    try {
        const response = await getGerenteFromToken(token);

        if (response.success) {
            return res.status(200).json(response); // Sucesso no login
        } else {
            return res.status(401).json(response); // Unauthorized
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: "Falha ao recuperar dados" });
    }
};

module.exports = { 
    loginUsuarioController, 
    getUsuarioFromTokenController, 
    loginGerenteController, 
    getGerenteFromTokenController 
};