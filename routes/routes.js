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
// import { sign } from "jsonwebtoken";
import jsonwebtoken from "jsonwebtoken";

import eAdmin from '../middleware/auth.js'
import validation from "../middleware/uservalidation.js";
import emailvalidation from "../middleware/emailvalidation.js";

const router = express.Router();

// ROTAS PARA GERENCIAMENTO DOS MEMBROS
router.get("/getmembros", getMembro);
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
router.post("/addmembro", addMembro);
router.post("/addqntmembros", addQntMembros);
router.post("/addqntmembros2", addQntMembros2);
router.put("/changemembro/:id", changeMembro);
router.put("/changeqntmembros", changeQntMembros);
router.put("/changeqntmembros2", changeQntMembros2);
router.delete("/deletemembro/:id", deleteMembro);

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
router.post("/addconta", addConta);
router.put("/changeconta/:id", changeConta);
router.delete("/deleteconta/:id", deleteConta);
router.get("/checkcontareceita/:id", checkContaReceita);
router.get("/checkcontadespesa/:id", checkContaDespesa);

// ROTAS PARA GERENCIAMENTO DOS CENTROS DE CUSTO
router.get("/getcustos", getCustos);
router.post("/addcusto", addCusto);
router.put("/changecusto/:id", changeCusto);
router.delete("/deletecusto/:id", deleteCusto);

// ROTAS PARA GERENCIAMENTO DO PLANO DE CONTAS
router.get("/getplanos", getPlano);
router.post("/addplano", addPlano);
router.put("/changeplano/:id", changePlano);
router.delete("/deleteplano/:id", deletePlano);
router.get("/getplanosreceita", getPlanoReceita);
router.get("/getplanosdespesa", getPlanoDespesa);

// ROTAS PARA GERENCIAMENTO DAS PESSOAS E FORNECEDORES PARA PAGAMENTO
router.get("/getfornecedores", getFornecedor);
router.post("/addfornecedor", addFornecedor);
router.put("/changefornecedor/:id", changeFornecedor);
router.delete("/deletefornecedor/:id", deleteFornecedor);

// ROTAS PARA RETORNAR OS VALORES PENDENTES DE PAGAMENTO E RECEBIMENTO
router.get("/getrecebimentos/:date", getRecebimentos)
router.get("/getpagamentos/:date", getPagamentos);

// ROTAS PARA A PAGINA DE TRANSAÇÕES
router.get("/gettransacoes/:init/:end", getTransacoes);
router.get("/getlastlancamentos/:init/:end", getLastLancamentos);
router.get("/getlastidr", getLastIdr);
router.post("/addtransacao", addTransacao);
router.put("/changetransacao/:id", changeTransacao);
router.put("/changestatus/:id", changeStatus);
router.delete("/deletelancamento/:id", deleteLancamento);
router.delete("/deletelancamento/:id/:idr", deleteLancamento2);
router.get("/getreceitasano/:init/:end", getReceitasAno);
router.get("/getdespesasano/:init/:end", getDespesasAno);

// ROTAS PARA GERENCIAMENTOS DAS EQUIPES
router.get("/getequipes", getEquipes);
router.get("/getmembrosequipe/:id", getMembrosEquipe);
router.get("/getmembroequipe/:id", getMembroEquipe);
router.get("/checkmembroequipe/:id/:equipe", checkMembroEquipe);
router.get("/getlastequipe", getLastequipe);
router.post("/addequipe", addEquipe);
router.post("/addmembroequipe", addMembroEquipe);
router.delete("/deleteequipe/:id", deleteEquipe);
router.delete("/deletemembroequipe/:id", deleteMembroEquipe);
router.put("/changeequipe/:id", changeEquipe);
router.put("/changemembroequipe/:id", changeMembroEquipe);

// ROTAS PARA VALIDAÇÃO DE ACESSO
router.get('/getusers', getUsers);
router.put('/changeuser/:id', changeUser);

router.post('/adduser', emailvalidation, async (req, res) => {

  const password = await bcrypt.hash(req.body.senha, 8);

  const q = "INSERT INTO users(`email`, `key`, `nome`, `senha`, `admin`, `super`) VALUES(?)";

  const values = [
    req.body.email,
    req.body.key,
    req.body.nome,
    password,
    req.body.admin,
    req.body.super
  ]

  connection.query(q, [values], (err) => {
    if (err) return res.json({
      error: true,
      message: 'Ocorreu um erro ao criar o usuário. Favor entre em contato com o administrador do sistema.',
      data: err
    });

    return res.status(200).json(`Usuário ${req.body.nome} criar com sucesso.`);
  });
})

router.post('/login', validation, async (req, res) => {

  const email = req.userdata.email;
  const senha = req.userdata.senha;
  const key = req.userdata.key;
  const id = req.userdata.id;
  const user = req.userdata.nome;
  const admin = req.userdata.admin;
  const superAdmin = req.userdata.super;

  if (!(await bcrypt.compare(req.body.senha, senha))) {
    return res.json({
      error: true,
      message: "Senha invalida. Contate o administrador do sistema."
    })
  }

  var token = jsonwebtoken.sign({ id, email, admin, superAdmin }, key, { expiresIn: 600 })

  return res.json({
    error: false,
    id,
    user,
    email,
    key,
    token,
  })
})

router.post('/validation', eAdmin, async (req, res) => {
  return res.json({
    error: false,
    message: 'Usuário validado.',
    admin: req.admin,
    super: req.super
  })
})

router.delete('/deleteuser/:id', deleteUser);

router.put('/changpass', async (req, res) => {

  const password = await bcrypt.hash(req.body.senha, 8);

  const q = "UPDATE users SET `senha` = ? WHERE id = ?";

  connection.query(q, [password, req.body.id], (err) => {
    if (err) return res.json({
      error: true,
      message: 'Ocorreu um erro ao modificar a senha do usuário. Favor entre em contato com o administrador do sistema.',
      data: err
    });

    return res.status(200).json('Senha Alterada com sucesso');
  });

})

export default router;
