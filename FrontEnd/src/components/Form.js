import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const FormContainer = styled.form`
display: flex;
align-items: flex-end;
justify-content: space-evenly;
gap: 10px;
flex-wrap: wrap;
background-color: #fff;
padding: 20px;
box-shadow: 0px 0px 5px #ccc;
border-radius: 5px;
width: 95vw;
margin: auto;
`;

const InputArea = styled.div`
display: flex;
flex-direction: column;
`;

const Input = styled.input`
width: 100%;
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
background-color: #2c73d2;
color: whitesmoke;
height: 42px;
`;


const Form = ({ getUsers, setOnEdit, onEdit, }) => {

    const ref = useRef();


    const phoneNumber = () => {
        const user = ref.current;
        const numero = user.fone.value.replace(/\D/g, '');

        if (numero.length === 11) {            
            const telefoneFormatado = `(${numero.substr(0, 2)}) ${numero[2]} ${numero.substr(3, 4)}-${numero.substr(7)}`;
            user.fone.value = telefoneFormatado;
        } else {          
            alert('Número de telefone inválido');
            user.fone.value = ''
        }

    }

    useEffect(() => {
        const user = ref.current;
        if (onEdit) {
            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.fone.value = onEdit.fone;
            user.data_nascimento.value = onEdit.data_nascimento;
        }

    }, [onEdit])


    const handleSubmit = async (e) => {

        e.preventDefault();

        const user = ref.current;

        if (
            !user.nome.value ||
            !user.email.value ||
            !user.fone.value ||
            !user.data_nascimento.value
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
            console.log(onEdit.id)
            await axios
                .put("http://localhost:8800/" + onEdit.id, {
                    nome: user.nome.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    data_nascimento: user.data_nascimento.value,
                }).then(({ data }) => toast.success(`Usuário ${onEdit.nome} atualizado!`))
                .catch(({ data }) => toast.error(data));
        } else {

            await axios
                .post("http://localhost:8800", {
                    nome: user.nome.value,
                    email: user.email.value,
                    fone: user.fone.value,
                    data_nascimento: user.data_nascimento.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }


        user.nome.value = "";
        user.email.value = "";
        user.fone.value = "";
        user.data_nascimento.value = "";

        setOnEdit(null);
        getUsers();
    };



    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome" />
            </InputArea>
            <InputArea>
                <Label>E-mail</Label>
                <Input name="email" type="email" />
            </InputArea>
            <InputArea>
                <Label>Telefone</Label>
                <Input name="fone" onBlur={phoneNumber} />
            </InputArea>
            <InputArea>
                <Label>Data de Nascimento</Label>
                <Input name="data_nascimento" type="date" />
            </InputArea>
            <Button type="submit">Submit</Button>
        </FormContainer>
    );
};

export default Form;