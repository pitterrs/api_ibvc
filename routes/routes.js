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
    checkConta
  } from "../controllers/queries.js";

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
router.get("/checkconta/:id", checkConta);

export default router;
