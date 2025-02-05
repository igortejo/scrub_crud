import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap; //campos se ajustam pra baixo quando a tela diminui
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;


const Input = styled.input`
    width: 120px;
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
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #3aa9b5; /* Cor mais escura no hover */
        transform: translateY(-2px); /* Efeito de levantar */
    }

    &:active {
        transform: translateY(0); /* Efeito de pressionar */
    }
`;


const Form = ({ getProducts, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => { //verifca se o formulario que ta recebendo tem algum item de edicao, ou seja, algum item do grid foi clicado o icone de edicao
        if (onEdit && ref.current) { // Verifica se ref.current não é null
            const product = ref.current; //refencia o formulario atual antes da edicao

            product.cor.value = onEdit.cor;
            product.tamanho.value = onEdit.tamanho;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault() //para nao recarregar a pagina

        const product = ref.current //referencia o formulario 

        if ( //se algum dos campos nao for preenchido
            !product.cor.value ||
            !product.tamanho.value 
        ) {
            return toast.warn("Preencha todos os campos!") 
        }

        if (onEdit) {  //verifica se é um item de edição
            await axios
              .put("http://localhost:3000/produto/" + onEdit.id, {
                cor: product.cor.value,
                tamanho: product.tamanho.value,
              })
              .then(({ data }) => toast.success(data))
              .catch(({ data }) => toast.error(data));

        } else { // se não for um item de edição é um item de criação
            await axios
              .post("http://localhost:3000/produto", {
                cor: product.cor.value,
                tamanho: product.tamanho.value,
              })
              .then(({ data }) => toast.success(data))
              .catch(({ data }) => toast.error(data));
        }

        //apos eu incluir ou editar um item eu limpo o formulario:
        product.cor.value = "";
        product.tamanho.value = "";

        setOnEdit(null); //para depois da edicao poder fazer uma inclusao sem da conflito
        getProducts(); //atualiza o grid
    };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Cor</Label>
                <Input name="cor" />
            </InputArea>

            <InputArea>
                <Label>Tamanho</Label>
                <Input name="tamanho" />
            </InputArea>

            <Button type="submit">SALVAR</Button>

        </FormContainer>
    );
};


export default Form;