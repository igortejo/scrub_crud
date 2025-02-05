import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Form from "../components/order/OrderForm";
import Grid from "../components/order/OrderGrid";
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

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/pedido");
      setOrders(res.data) //.sort((a, b) => (a.nome > b.nome ? 1 : -1))); ordenar o resultado
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [setOrders]);

  return (
    <>
    <Container>
      <Title>CRUD PEDIDOS</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getOrders={getOrders} /> {/*esse getOrders vai atualizar os dados */}
      <Grid orders={orders} setOrders={setOrders} setOnEdit={setOnEdit} />
      {/* <Link to="/products">Ir para Produtos</Link> */}
    </Container>
    </>
  );
};

export default OrderPage;
