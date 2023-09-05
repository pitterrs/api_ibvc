import jsonwebtoken from "jsonwebtoken";
import { promisify } from "util";

const eAdmin = async (req, res, next) => {
    const token = req.body.Authorization;
    const key = req.body.key;
    // console.log(req);
    if(!token){
        return res.status(400).json({
            error: true,
            message: "Usuário não Autorizado"
        })
    }

    try {
        const decode = await promisify(jsonwebtoken.verify)(token, key);
        req.admin = decode.admin;
        req.super = decode.superAdmin;
        // console.log(req.admin);
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