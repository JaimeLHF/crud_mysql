import { db } from '../db.js';

export const getUsers = (req, res) => {
    const query = "SELECT * FROM usuarios";

    db.query(query, (err, data) => {
        if (err) return res.json(`Erro: ${err}`);

        return res.status(200).json(data)
    })
};

export const addUsers = (req, res) => {
    const query = "INSERT INTO usuarios(`nome`, `email`, `fone`, `data_nascimento`) VALUES(?)";

    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.data_nascimento,
    ];

    db.query(query, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json(`Usuário ${req.body.nome} criado com sucesso!`)
    })
}


export const updateUser = (req, res) => {
    const query = "UPDATE usuarios SET `nome` = ?, `email` = ?, `fone` = ?, `data_nascimento` = ? WHERE `id` = ?"

    const values = [
        req.body.nome,
        req.body.email,
        req.body.fone,
        req.body.data_nascimento,
    ];
    
    db.query(query, [...values, req.params.id], (err) => {
        if (err) return res.status(500).json(err)

        return res.status(200).json(`Usuário ${req.body.nome} atualizado com sucesso!`)
    })
};


export const deleteUsers = (req, res) => {

    const selectQuery = "SELECT nome FROM usuarios WHERE `id` = ?";

    db.query(selectQuery, [req.params.id], (err, results) => {
        if (err) return res.json(err);

        if (results.length === 0) {
            return res.status(404).json(`Usuário com ID ${id} não encontrado.`);
        }
        const nomeDoUsuario = results[0].nome;




        const queryDelete = "DELETE FROM usuarios WHERE `id` = ?";

        db.query(queryDelete, [req.params.id], (err) => {
            if (err) return res.json(err);

            return res.status(200).json(`Usuário ${nomeDoUsuario} deletado com sucesso.`);
        });
    })
}