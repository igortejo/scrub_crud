import { useState } from "react";
import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify"

const LogInContainer = styled.form`
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    flex-wrap: wrap; //campos se ajustam pra baixo quando a tela diminui
    background-color: #fff;
    padding: 40px;
    margin-top: 40px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;


const Input = styled.input`
    width: 200px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #56c5d0;
    color: white;
    height: 42px;
    width: 100px;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #3aa9b5; /* Cor mais escura no hover */
        transform: translateY(-2px); /* Efeito de levantar */
    }

    &:active {
        transform: translateY(0); /* Efeito de pressionar */
    }
`;


const Login = () => {  
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await axios.post("http://localhost:3000/auth/cliente/login", {email, password});
          if (response.data.success) {
            toast.success(response.data.message || 'Sucesso ao fazer login!')
            console.log(response)
            const token = response.data.token;
            sessionStorage.setItem("authToken", token); //armazenando o token
            navigate("/cliente/homeScreen")  //assim que der sucesso no login, vai pra essa pagina


          } else {
            toast.error(response.data.message || 'Falha ao fazer login!')
          }
        } catch (error) {
            console.error('Erro durante login:', error)
            toast.error( error.response.data.message || 'Algo deu errado, tente novamente!')
        }

    }

    return (
      <>
        <LogInContainer onSubmit={handleSubmit}>
          <h2>Login Cliente</h2>
            <InputArea>
              <Label>Email</Label>
              <Input 
                placeholder="Seu email"
                onChange={e => setEmail(e.target.value)} 
              />
            </InputArea>

            <InputArea>
              <Label>Senha</Label>
              <Input 
                placeholder="Sua senha"
                onChange={e => setPassword(e.target.value)}
              />
            </InputArea>

            <Button type="submit">Entrar</Button>

            <h6>Não tem conta? <a href="/usuario">Cadastre-se</a></h6>
            <h5><a href="/">Voltar</a></h5>

        </LogInContainer>
      </>
    );
  };
  
  export default Login;