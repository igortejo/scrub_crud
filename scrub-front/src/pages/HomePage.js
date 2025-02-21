import styled from "styled-components";
import logo from '../assets/logoScrubUp.jpg';

const Header = styled.header`
    padding: 20px;
    background-color: white;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 10;
    width: 100%; 
`;

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
`;

const Title = styled.h2`
    font-size: 28px;
    color: #333;
    margin-bottom: 40px;
    text-align: center;
`;

const LogIn = styled.div`
    display: flex;
    justify-content: center;
    gap: 30px;
    width: 100%;
    max-width: 500px;
    margin-top: 40px;
`;

const LogInButton = styled.div`
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

const Link = styled.a`
    text-decoration: none;
    color: inherit;
    font-weight: bold;
`;

const HomePage = () => {
    return (
        <>
            <Header>
                <img src={logo} alt="scrubup" style={{ height: "90px" }} />
                <span>ScrubUP - Pijamas Hospitalares</span>
            </Header>

            <Container>
                <Title>Bem-vindo ao sistema CRUD da loja ScrubUP</Title>
                <LogIn>
                    <LogInButton>
                        <Link href="/cliente/login">Cliente</Link>
                    </LogInButton>
                    <LogInButton>
                        <Link href="/gerente/login">Gerente</Link>
                    </LogInButton>
                </LogIn>
            </Container>
        </>
    );
};

export default HomePage;