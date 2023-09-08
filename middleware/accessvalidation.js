import jsonwebtoken from "jsonwebtoken";
import { promisify } from "util";

const accessValidation = async (req, res, next) => {
    // console.log(`Token=${req.headers.authorization}+ key=${req.headers.key}`);

    const token = req.headers.authorization ? req.headers.authorization : req.body.token;
    const key = req.headers.key ? req.headers.key : req.body.key;

    if (!token) {
        return res.status(401).json({
            error: true,
            message: "Usuário não Autorizado"
        })
    }

    try {
        const decode = await promisify(jsonwebtoken.verify)(token, key);
        req.super = decode.superAdmin;
        req.changemembros = decode.changemembros;
        req.viewequipes = decode.viewequipes;
        req.createequipes = decode.createequipes;
        req.viewfinancas = decode.viewfinancas;
        req.createfinancas = decode.createfinancas;

        switch (req.route.path) {
            case '/addmembro':
                if (req.changemembros === 'false') {
                    return res.status(403).json({
                        error: true,
                        message: 'Acesso Negado!',
                    })
                }
                break;

            default:
                break;
        }

        return next();
    } catch (err) {
        return res.status(401).json({
            error: true,
            message: 'Sessão expirada. Realizar login novamente',
            data: err
        });
    }
}

export default accessValidation;