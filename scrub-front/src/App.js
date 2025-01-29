import GlobalStyle from "./styles/global";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./components/Form"
import Grid from "./components/Grid"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css" //estilizacao da biblioteca toastify


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

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);  //entender melhor 

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/usuario");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1))) //ordenar o resultado
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
      <Title>USUÁRIOS</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />  {/*esse getUsers vai atualizar os dados */}
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>
    </Container>
    <ToastContainer autoClose={3000} />
    <GlobalStyle />
    </>
  );
}

export default App;
