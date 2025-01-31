import styled from "styled-components";


const Container = styled.div`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-top: 30px;
    
    /* border: 1px solid red; */
`;

const Title = styled.h2`
    font-size: 35px;
`;

const LogIn = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 60px;
    margin-top: 200px;
    /* border: 1px solid green; */
`;

const LogInCliente = styled.div`
    background-color: blue;
    color: white;
    border: 1px solid green;
    padding: 10px;
`;

const LogInGerente = styled.div`
    background-color: blue;
    color: white;
    border: 1px solid green;
    padding: 10px;
`;

const Link = styled.a`
    text-decoration: none;
    color: inherit;
`;


const LogInPage = () => {  
    return (
      <>
        <Container>
            <Title>Bem vindo ao sistema CRUD da loja ScrubUP</Title>
            <LogIn>
                <LogInCliente><Link href="/cliente">Cliente</Link></LogInCliente>
                <LogInGerente><Link href="/gerente">Gerente</Link></LogInGerente>
            </LogIn>
        </Container>
      </>
    );
  };
  
  export default LogInPage;