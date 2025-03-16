import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    margin: 0 auto;
    background-color: #f9f9f9; 
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); 
    margin-top: 30px;
    gap: 30px;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
`;

const Button = styled.div`
    padding: 15px 30px;
    cursor: pointer;
    border-radius: 30px;
    background-color: #56c5d0;
    color: white;
    font-size: 20px;
    text-align: center;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #3aa9b5; /* Cor mais escura no hover */
        transform: translateY(-2px); /* Efeito de levantar */
    }

    &:active {
        transform: translateY(0); /* Efeito de pressionar */
    }
`;

function GerenteHomeScreen() {

    const [userData, setUserData] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      fetchUserDetails();
    }, []);
    const fetchUserDetails = async () => {
      try {
        // recuperando o token da sessionStorage
        const token = sessionStorage.getItem("authToken"); 
        console.log(token);
  
        if (!token) {
          // setError('Usuario nao esta logado');
          return;
        }
        const response = await axios.get(
            "http://localhost:3000/auth/gerente/getGerenteDetalhes",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
                
        if (response.data.success) {
          setUserData(response.data.data); //colocando os dados do cliente no userData
          let userInfo = {
              isLoggedIn:true,
              userData:response.data.data
          }
          sessionStorage.setItem('userData',JSON.stringify(userInfo));
        } else {
          console.log(response.data.message || "Falha ao buscar detalhes do usuário");
        }
      } catch (err) {
        console.error("Erro ao buscar detalhes do usuário:", err);
        console.log(err.response?.data?.message || "Ocorreu um erro");
      }
    };

    const goToUser = () => {
      navigate("/usuario")
    }

    const goToProduct = () => {
      navigate("/produto")
    }

    const goToOrder = () => {
      navigate("/pedido")
    }

    return (
      <>
      <Container>
        <h2 style={{ textAlign: "center" }}>Bem vindo(a) a página do Gerente</h2>

        <ButtonContainer>
          <Button onClick={goToUser}>
            CRUD Usuario
          </Button>

          <Button onClick={goToProduct}>
            CRUD Produto
          </Button>

          <Button onClick={goToOrder}>
            CRUD Pedido
          </Button>
        </ButtonContainer>
      </Container>
      </>
    );
}

export default GerenteHomeScreen;