import { connection } from "../connection.js";

const emailvalidation = async (req, res, next) => {
    const q =
        "SELECT * FROM users WHERE email = ?";

    connection.query(q, [req.body.email], (err, data) => {
        if (err) return res.json({
            error: true,
            message: 'Erro de conexão com o banco de dados. Contate o administrador do sistema.'
        });

        if (data.length > 0) {
            return res.json({
                error: true,
                message: 'Já existe um usuário com este email. Favor cadastrar um email diferente.'
            });
        } else {
            return next();
        }

    });
}

export default emailvalidation;