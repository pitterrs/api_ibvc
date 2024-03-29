import jsonwebtoken from "jsonwebtoken";
import { promisify } from "util";

const eAdmin = async (req, res, next) => {
    const token = req.body.Authorization;
    const key = req.body.key;
    if(!token){
        return res.status(400).json({
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
        return next();
    } catch (err) {
        return res.json({
            error: true,
            message: 'Sessão expirada. Realizar login novamente',
            number: 401,
            data: err
        });
    }
}

export default eAdmin;