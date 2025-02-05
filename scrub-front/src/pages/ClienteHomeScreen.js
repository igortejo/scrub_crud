import React, { useEffect, useState } from "react";
import axios from "axios";
// import Header from "../components/Header";


function ClienteHomeScreen() {

    const [userData, setUserData] = useState("");

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
        // Make the API request with the token in the Authorization header
        const response = await axios.get(
            "http://localhost:3000/auth/cliente/getUsuarioDetalhes",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("chegou aqui")
        console.log(response)
                
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
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Welcome to User Home Screen</h2>
        <div style={{textAlign:'center'}}>
           <h2> Nome: {userData.nome} <br/> Email: {userData.email} </h2>
        </div>
      </div>
    );
}

export default ClienteHomeScreen;