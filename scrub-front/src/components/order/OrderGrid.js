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

const Grid = ( {orders, setOrders, setOnEdit} ) => {   //orders vai receber os pedidos do banco de dados

    const handleDelete = async (id) => {
        await axios
            .delete("http://localhost:3000/pedido/" + id)
            .then(({ data }) => {  //esse data é o texto que o backend retorna
                const newArray = orders.filter((order) => order.id !== id); //aqui retorna todos os pedidos, menos aquele que foi deletado

                setOrders(newArray);  //coloca esse newArray filtrado no setOrders
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
                    <Th>Descrição</Th>
                    <Th>Usuario Id</Th>
                    <Th>Valor Total</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>

            <Tbody>
                {orders.map((item, i) => (
                    <Tr key={i}>
                        <Td width="30%">{item.descricao}</Td>
                        <Td width="30%">{item.usuarioId}</Td>
                        <Td width="30%">{item.valorTotal}</Td>
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