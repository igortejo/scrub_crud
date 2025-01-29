import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "../components/Form";
import Grid from "../components/Grid";
// import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/pedido");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1))); //ordenar o resultado
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
    <Container>
      <Title>CRUD PEDIDOS</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} /> {/*esse getUsers vai atualizar os dados */}
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      {/* <Link to="/products">Ir para Produtos</Link> */}
    </Container>
    </>
  );
};

export default UserPage;
