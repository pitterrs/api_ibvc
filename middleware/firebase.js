import admin from "firebase-admin";
import serviceAccount from "../firebase-key2.js";

const BUCKET = "ibvc-fotos.appspot.com";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadImage = (req, res, next) => {

    if (!req.file) return next();

    const imagem = req.file;
    // const nomeArquivo = req.body.foto_name ? req.body.foto_name : Date.now() + "." + imagem.originalname.split(".").pop();
    const nomeArquivo = Date.now() + "." + imagem.originalname.split(".").pop();

    const file = bucket.file(nomeArquivo);

    const stream = file.createWriteStream({
        metadata: {
            contentType: imagem.mimeType,
        },
    });

    stream.on("error", (e) => {
        console.error(e);
    });

    stream.on("finish", async () => {

        await file.makePublic();

        req.file.firebaseUrl = `https://storage.googleapis.com/${BUCKET}/${nomeArquivo}`;
        // req.file.imageName = nomeArquivo;

        next();

    });

    stream.end(imagem.buffer);
}

export default uploadImage;