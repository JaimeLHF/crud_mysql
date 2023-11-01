import axios from "axios";
import GlobalStyle from "./styles/Global.js";
import { useEffect, useState } from "react";
import styled from 'styled-components'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Form from "./components/Form.js";
import Grid from "./components/Grid.js";

const Container = styled.div`
width: 100%;
max-width: 90vw;
margin-top: 20px;
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
`;

const Title = styled.h2``;

function App() {

  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.id > b.id ? 1 : -1)));
    } catch (err) {
      toast.error(err);
    }
  }

  useEffect(() => {
    getUsers();
  }, [setUsers]);


  return (
    <>
      <Container>
        <Title>Usuários</Title>
      </Container>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
      <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit} />
      <ToastContainer autoClose={1500} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
