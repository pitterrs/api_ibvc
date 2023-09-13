import express from "express";
import {
  getMembro,
  getTotalMembros,
  getTotalMembros2,
  getQntAtual,
  getQntAtual2,
  getQntAnterior,
  getInativos,
  getAllInativos,
  getAllativos,
  getAllHomens,
  getAllMulheres,
  addMembro,
  addQntMembros,
  addQntMembros2,
  changeMembro,
  changeQntMembros,
  changeQntMembros2,
  deleteMembro,
  getFinancas,
  addFinancas,
  changeFinancas,
  deleteFianancas,
  getDiaconos,
  addDiaconos,
  changeDiaconos,
  deleteDiaconos,
  getMensageiras,
  addMensageiras,
  changeMensageiras,
  deleteMensageiras,
  getContas,
  addConta,
  changeConta,
  deleteConta,
  checkContaReceita,
  checkContaDespesa,
  getCustos,
  addCusto,
  changeCusto,
  deleteCusto,
  getPlano,
  addPlano,
  changePlano,
  deletePlano,
  getFornecedor,
  addFornecedor,
  changeFornecedor,
  deleteFornecedor,
  getRecebimentos,
  getPagamentos,
  getTransacoes,
  getPlanoDespesa,
  getPlanoReceita,
  addTransacao,
  changeTransacao,
  changeStatus,
  deleteLancamento,
  getLastIdr,
  deleteLancamento2,
  getLastLancamentos,
  getReceitasAno,
  getDespesasAno,
  getEquipes,
  addEquipe,
  getLastequipe,
  deleteEquipe,
  changeEquipe,
  getMembrosEquipe,
  addMembroEquipe,
  getMembroEquipe,
  changeMembroEquipe,
  checkMembroEquipe,
  deleteMembroEquipe,
  getUsers,
  deleteUser,
  changeUser
} from "../controllers/queries.js";
import { connection } from "../connection.js";
import bcrypt from 'bcryptjs';
import jsonwebtoken from "jsonwebtoken";
import eAdmin from '../middleware/auth.js'
import validation from "../middleware/uservalidation.js";
import emailvalidation from "../middleware/emailvalidation.js";
import accessValidation from "../middleware/accessvalidation.js";
import changeUserValidation from "../middleware/changeuservalidation.js";
import equipesValidation from "../middleware/equipesvalidation.js";
import equipesValidation2 from "../middleware/equipesvalidation2.js";
import membroValidation from "../middleware/membrovalidation.js";
import contasValidation from "../middleware/contasvalidation.js";
import uploadImage from "../middleware/firebase.js";
import multer from "multer";

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024, 
})

const router = express.Router();

router.post("/image", Multer.single("imagem"), uploadImage, async (req, res) => {
  
  const q = 'UPDATE users SET `foto` = ? WHERE `id` = 1'

  connection.query(q, [req.file.firebaseUrl], (err) => {
    if (err) return res.status(500).json({
      error: true,
      message: 'Ocorreu um erro ao criar o usuário. Favor entre em contato com o administrador do sistema ou tente novamente mais tarde.',
      data: err
    });

    return res.status(200).json({
      error: false,
      message: 'Foto adicionada com sucesso.',
    });
  });

} );

// ROTAS PARA GERENCIAMENTO DOS MEMBROS
router.get("/getmembros", accessValidation, getMembro);
router.get("/totalmembrosativos", getTotalMembros);
router.get("/totalmembrosinativos", getTotalMembros2);
router.get("/qntmembrosatual", getQntAtual);
router.get("/qntmembrosatual2", getQntAtual2);
router.get("/qntmembrosanterior", getQntAnterior);
router.get("/getinativos", getInativos);
router.get("/getallinativos", getAllInativos);
router.get("/getallativos", getAllativos);
router.get("/getallhomens", getAllHomens);
router.get("/getallmulheres", getAllMulheres);
router.post("/addmembro", Multer.single("imagem"), accessValidation, uploadImage, addMembro);
router.post("/addqntmembros", addQntMembros);
router.post("/addqntmembros2", addQntMembros2);
router.put("/changemembro/:id", Multer.single("imagem"), membroValidation, uploadImage, changeMembro);
router.put("/changeqntmembros", changeQntMembros);
router.put("/changeqntmembros2", changeQntMembros2);
router.delete("/deletemembro/:id", membroValidation, deleteMembro);

// ROTAS PARA GERENCIMENTO DA COMISSAO DE FINANÇAS
router.get("/getfinancas", getFinancas);
router.post("/addfinancas", addFinancas);
router.put("/changefinancas/:id", changeFinancas);
router.delete("/deletefinancas/:id", deleteFianancas);

// ROTAS PARA GERENCIMENTO DO CORPO DIACONAL
router.get("/getdiaconos", getDiaconos);
router.post("/adddiaconos", addDiaconos);
router.put("/changediaconos/:id", changeDiaconos);
router.delete("/deletediaconos/:id", deleteDiaconos);

// ROTAS PARA GERENCIMENTO DAS MENSAGEIRAS DO REI
router.get("/getmensageiras", getMensageiras);
router.post("/addmensageiras", addMensageiras);
router.put("/changemensageiras/:id", changeMensageiras);
router.delete("/deletemensageiras/:id", deleteMensageiras);

// ROTAS PARA GERENCIAMENTO DAS CONTAS BANCÁRIAS
router.get("/getcontas", getContas);
router.post("/addconta", contasValidation, addConta);
router.put("/changeconta/:id", contasValidation, changeConta);
router.delete("/deleteconta/:id", contasValidation, deleteConta);
router.get("/checkcontareceita/:id", checkContaReceita);
router.get("/checkcontadespesa/:id", checkContaDespesa);

// ROTAS PARA GERENCIAMENTO DOS CENTROS DE CUSTO
router.get("/getcustos", getCustos);
router.post("/addcusto", contasValidation, addCusto);
router.put("/changecusto/:id", contasValidation, changeCusto);
router.delete("/deletecusto/:id", contasValidation, deleteCusto);

// ROTAS PARA GERENCIAMENTO DO PLANO DE CONTAS
router.get("/getplanos", getPlano);
router.post("/addplano", contasValidation, addPlano);
router.put("/changeplano/:id", contasValidation, changePlano);
router.delete("/deleteplano/:id", contasValidation, deletePlano);
router.get("/getplanosreceita", getPlanoReceita);
router.get("/getplanosdespesa", getPlanoDespesa);

// ROTAS PARA GERENCIAMENTO DAS PESSOAS E FORNECEDORES PARA PAGAMENTO
router.get("/getfornecedores", getFornecedor);
router.post("/addfornecedor", contasValidation, addFornecedor);
router.put("/changefornecedor/:id", contasValidation, changeFornecedor);
router.delete("/deletefornecedor/:id", contasValidation, deleteFornecedor);

// ROTAS PARA RETORNAR OS VALORES PENDENTES DE PAGAMENTO E RECEBIMENTO
router.get("/getrecebimentos/:date", getRecebimentos)
router.get("/getpagamentos/:date", getPagamentos);

// ROTAS PARA A PAGINA DE TRANSAÇÕES
router.get("/gettransacoes/:init/:end", getTransacoes);
router.get("/getlastlancamentos/:init/:end", getLastLancamentos);
router.get("/getlastidr", getLastIdr);
router.post("/addtransacao", contasValidation, addTransacao);
router.put("/changetransacao/:id", contasValidation, changeTransacao);
router.put("/changestatus/:id", contasValidation, changeStatus);
router.delete("/deletelancamento/:id", contasValidation, deleteLancamento);
router.delete("/deletelancamento/:id/:idr", contasValidation, deleteLancamento2);
router.get("/getreceitasano/:init/:end", getReceitasAno);
router.get("/getdespesasano/:init/:end", getDespesasAno);

// ROTAS PARA GERENCIAMENTOS DAS EQUIPES
router.get("/getequipes", equipesValidation2, getEquipes);
router.get("/getmembrosequipe/:id", equipesValidation2, getMembrosEquipe);
router.get("/getmembroequipe/:id", getMembroEquipe);
router.get("/checkmembroequipe/:id/:equipe", checkMembroEquipe);
router.get("/getlastequipe", getLastequipe);
router.post("/addequipe", equipesValidation, addEquipe);
router.post("/addmembroequipe", equipesValidation, addMembroEquipe);
router.delete("/deleteequipe/:id", equipesValidation, deleteEquipe);
router.delete("/deletemembroequipe/:id", equipesValidation, deleteMembroEquipe);
router.put("/changeequipe/:id", equipesValidation, changeEquipe);
router.put("/changemembroequipe/:id", equipesValidation, changeMembroEquipe);

// ROTAS PARA VALIDAÇÃO DE ACESSO
router.get('/getusers', changeUserValidation, getUsers);
router.put('/changeuser/:id', Multer.single("imagem"), changeUserValidation, uploadImage, changeUser);

router.post('/adduser', Multer.single("imagem"), emailvalidation, changeUserValidation, uploadImage, async (req, res) => {

  const password = await bcrypt.hash(req.body.senha, 8);

  // const q = `INSERT INTO users(email, key, nome, senha, admin, super, changemembros, viewequipes, createequipes, viewfinancas, createfinancas) VALUES('${req.body.email}', '${req.body.key}', '${req.body.nome}', '${password}', '${req.body.admin}', '${req.body.super}', '${req.body.changemembros}', '${req.body.viewequipes}', '${req.body.createequipes}', '${req.body.viewfinancas}', '${req.body.createfinancas}')`;
  const q = "INSERT INTO users(`email`, `key`, `nome`, `senha`, `super`, `changemembros`, `viewequipes`, `createequipes`, `viewfinancas`, `createfinancas`, `foto`) VALUES(?)";

  const superadmin = `${req.body.super}`;
  const changemembros = `${req.body.changemembros}`;
  const viewequipes = `${req.body.viewequipes}`;
  const createequipes = `${req.body.createequipes}`;
  const viewfinancas = `${req.body.viewfinancas}`;
  const createfinancas = `${req.body.createfinancas}`;

  const values = [
    req.body.email,
    req.body.chave,
    req.body.nome,
    password,
    superadmin,
    changemembros,
    viewequipes,
    createequipes,
    viewfinancas,
    createfinancas,
    req.file.firebaseUrl,
    // req.file.imageName
  ]


  connection.query(q, [values], (err) => {
    if (err) return res.status(500).json({
      error: true,
      message: 'Ocorreu um erro ao criar o usuário. Favor entre em contato com o administrador do sistema ou tente novamente mais tarde.',
      data: err
    });

    return res.status(200).json({
      error: false,
      message: `Usuário ${req.body.nome} criado com sucesso.`,
    });
  });
})

router.post('/login', validation, async (req, res) => {

  const email = req.userdata.email;
  const senha = req.userdata.senha;
  const key = req.userdata.key;
  const id = req.userdata.id;
  const user = req.userdata.nome;
  const superAdmin = req.userdata.super;
  const changemembros = req.userdata.changemembros;
  const viewequipes = req.userdata.viewequipes;
  const createequipes = req.userdata.createequipes;
  const viewfinancas = req.userdata.viewfinancas;
  const createfinancas = req.userdata.createfinancas;
  const foto = req.userdata.foto

  if (!(await bcrypt.compare(req.body.senha, senha))) {
    return res.json({
      error: true,
      message: "Senha invalida. Contate o administrador do sistema."
    })
  }

  var token = jsonwebtoken.sign({ id, email, superAdmin, changemembros, viewequipes, createequipes, viewfinancas, createfinancas }, key, { expiresIn: '1d' })

  return res.json({
    error: false,
    id,
    user,
    email,
    key,
    token,
    foto
  })
})

router.post('/validation', eAdmin, async (req, res) => {
  return res.json({
    error: false,
    message: 'Usuário validado.',
    super: req.super,
    changemembros: req.changemembros,
    viewequipes: req.viewequipes,
    createequipes: req.createequipes,
    viewfinancas: req.viewfinancas,
    createfinancas: req.createfinancas
  })
})

router.delete('/deleteuser/:id', changeUserValidation, deleteUser);

router.put('/changpass', changeUserValidation, async (req, res) => {

  const password = await bcrypt.hash(req.body.senha, 8);

  const q = "UPDATE users SET `senha` = ? WHERE id = ?";

  connection.query(q, [password, req.body.id], (err) => {
    if (err) return res.json({
      error: true,
      message: 'Ocorreu um erro ao modificar a senha do usuário. Favor entre em contato com o administrador do sistema.',
      data: err
    });

    return res.status(200).json({
      error: false,
      message: 'Senha Alterada com sucesso'
    });
  });

})

export default router;