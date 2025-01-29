import React from "react";
import styled from "styled-components";
import axios from "axios"
import { FaTrash, FaEdit } from "react-icons/fa"
import { toast } from "react-toastify"


const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;
`;


export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};
`;

const Grid = ( {products, setProducts, setOnEdit} ) => {   //products vai receber os produtos do banco de dados

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:3000/produto/" + id)
            .then(({ data }) => {  //esse data é o texto que o backend retorna
                const newArray = products.filter((product) => product.id !== id); //aqui retorna todos os produtos, menos aquele que foi deletado

                setProducts(newArray);  //coloca esse newArray filtrado no setproducts
                toast.success(data); //passa a mensagem no toast
            })
            .catch(({ data }) => toast.error(data));
        
        setOnEdit(null);
    }

    const handleEdit = async (item) => {
        setOnEdit(item);
    }

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Cor</Th>
                    <Th>Tamanho</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>

            <Tbody>
                {products.map((item, i) => (
                    <Tr key={i}>
                        <Td width="30%">{item.cor}</Td>
                        <Td width="30%">{item.tamanho}</Td>
                        <Td width="5%">
                            <FaEdit onClick={() => handleEdit(item)}/>
                        </Td> 
                        <Td width="5%">
                            <FaTrash onClick={() => handleDelete(item.id)} />
                        </Td>
                    </Tr>
                ))}
            </Tbody>

        </Table>
    );
};

export default Grid; 