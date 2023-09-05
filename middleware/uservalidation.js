import bcrypt from 'bcryptjs';
import { connection } from "../connection.js";
// import jsonwebtoken from "jsonwebtoken";

// import eAdmin from '../middleware/auth.js'

const validation = async (req, res, next) => {
    const q =
        "SELECT * FROM users WHERE email = ?";

    // const values = [
    //     req.body.email,
    //     req.body.nome_equipe,
    //     req.body.id_membro,
    //     req.body.nome_membro,
    //     req.body.funcao
    // ];

    connection.query(q, [req.body.email], (err, data) => {
        if (err) return res.json({
            error: true,
            message: 'Erro de conexão com o banco de dados. Contate o administrador do sistema.'
        });

        if (data.length > 0) {
            req.userdata = data[0];
            return next();
        } else {
            return res.json({
                error: true,
                message: "Usuário não cadastrado, verifique com o administrador do sistema."
            })
        }

    });
}

export default validation;