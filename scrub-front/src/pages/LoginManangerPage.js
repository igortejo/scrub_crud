import styled from "styled-components";

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


const LoginManangerPage = () => {  
    return (
      <>
        <LogInContainer>
          <h2>Login Gerente</h2>
            <InputArea>
              <Label>Email</Label>
              <Input></Input>
            </InputArea>

            <InputArea>
              <Label>Senha</Label>
              <Input></Input>
            </InputArea>

            <Button type="submit">Entrar</Button>

            <h5><a href="/">Voltar</a></h5>

        </LogInContainer>
      </>
    );
  };
  
  export default LoginManangerPage;