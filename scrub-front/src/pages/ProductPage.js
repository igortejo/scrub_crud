import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Form from "../components/product/ProductForm";
import Grid from "../components/product/ProductGrid";
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

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/produto");
      setProducts(res.data) //.sort((a, b) => (a.nome > b.nome ? 1 : -1))); ordenar o resultado
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [setProducts]);

  return (
    <>
    <Container>
      <Title>CRUD PRODUTOS</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getProducts={getProducts} /> {/*esse getProducts vai atualizar os dados */}
      <Grid products={products} setProducts={setProducts} setOnEdit={setOnEdit} />
      {/* <Link to="/products">Ir para Produtos</Link> */}
    </Container>
    </>
  );
};

export default ProductPage;
