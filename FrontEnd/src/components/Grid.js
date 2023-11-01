import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from 'react-icons/fa'
import { toast } from "react-toastify";

const Table = styled.table`
width: 100%;
text-align: center;
background-color: #fff;
padding: 20px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;
max-width: 90vw;
margin: 20px auto;
word-break: break-all;
`;

export const Thead = styled.thead``;
export const Tr = styled.tr``;
export const Th = styled.th`
  border-bottom: inset;
  padding-bottom: 5px;
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }

`;

export const Tbody = styled.tbody``;

export const Td = styled.td`
  padding-top: 15px;
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;


const Grid = ({ users, setUsers, setOnEdit }) => {

  const handleEdit = async (e) => {    
    setOnEdit(e)
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);
        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));
    setOnEdit(null);
  };

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Nome</Th>
          <Th>E-mail</Th>
          <Th >Fone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((e, index) => (
          <Tr key={index}>
            <Td width="5%">{e.id}</Td>
            <Td width="30%">{e.nome}</Td>
            <Td width="30%">{e.email}</Td>
            <Td width="20%" >{e.fone}</Td>
            <Td width="5%"><FaEdit onClick={() => handleEdit(e)} /></Td>
            <Td width="5%"><FaTrash onClick={() => handleDelete(e.id)} /></Td>
          </Tr>
        ))}
      </Tbody>

    </Table>
  );
};

export default Grid;