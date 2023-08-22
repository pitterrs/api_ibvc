import { connection } from "../connection.js";

// FUNÇÕES PARA DOS MEMBROS

export const getMembro = (req, res) => {
    const q = `SELECT * FROM membros`;
    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

export const getTotalMembros = (req, res) => {
    const q = `SELECT COUNT(*) AS quantidade FROM membros WHERE situacao = 'Membro Ativo';`;
    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

export const getTotalMembros2 = (req, res) => {
    const q = `SELECT COUNT(*) AS quantidade FROM membros WHERE situacao = 'Membro Inativo';`;
    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

export const getQntAtual = (req, res) => {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    let mes = dataAtual.getMonth() + 1;
    if (mes < 10){
        mes = '0'+ mes;
    }
    const q = `SELECT * FROM membros_ativos_mes WHERE ano = '${ano}' AND mes = '${mes}';`;
    // res.send(q);
    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
};

export const getQntAtual2 = (req, res) => {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    let mes = dataAtual.getMonth() + 1;
    if (mes < 10){
        mes = '0'+ mes;
    }
    const q = `SELECT * FROM membros_inativos_mes WHERE ano = '${ano}' AND mes = '${mes}';`;
    // res.send(q);
    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
};

export const getQntAnterior = (req, res) => {
    const dataAtual = new Date();
    let ano = dataAtual.getFullYear();
    let mes = dataAtual.getMonth() + 1;
    if (mes < 10 && mes > 1){
        mes = mes - 1;
        mes = '0'+ mes;
    } else if(mes == 1){
        ano = dataAtual.getFullYear() - 1;
        mes = 12;
    }else if(mes == 10){
        mes = '0' + (mes - 1);
    }else{
        mes = mes - 1;
    }
    const q = `SELECT * FROM membros_ativos_mes WHERE ano = '${ano}' AND mes = '${mes}';`;
    // res.send(q);
    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
};

export const getInativos = (req, res) => {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    let mes = dataAtual.getMonth() + 1;
    if (mes < 10){
        mes = '0'+ mes;
    }
    const q = `SELECT * FROM membros_inativos_mes WHERE ano = '${ano}' AND mes = '${mes}';`;
    // res.send(q);
    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
};

export const getAllInativos = (req, res) => {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const q = `SELECT * FROM membros_inativos_mes WHERE ano = '${ano}' ORDER BY mes ASC`;

    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })

};

export const getAllativos = (req, res) => {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const q = `SELECT * FROM membros_ativos_mes WHERE ano = '${ano}' ORDER BY mes ASC`;

    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })

};

export const getAllHomens = (req, res) => {

    const q = `SELECT COUNT(*) as genero FROM membros WHERE genero = 'Masculino'`;

    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })

};

export const getAllMulheres = (req, res) => {

    const q = `SELECT COUNT(*) as genero FROM membros WHERE genero = 'Feminino'`;

    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })

};

export const addMembro = (req, res) => {
    const q =
        "INSERT INTO membros(`nome`, `email`, `celular`, `telefone`, `genero`, `nascimento`, `civil`, `cep`, `endereco`, `numero`, `complemento`, `admissao`, `obs_admissao`, `situacao`, `conversao`, `batismo`, `chamado`, `outrasinfos`) VALUES(?)";

    const values = [
        req.body.nome,
        req.body.email,
        req.body.celular,
        req.body.telefone,
        req.body.genero,
        req.body.nascimento,
        req.body.civil,
        req.body.cep,
        req.body.endereco,
        req.body.numero,
        req.body.complemento,
        req.body.admissao,
        req.body.obs_admissao,
        req.body.situacao,
        req.body.conversao,
        req.body.batismo,
        req.body.chamado,
        req.body.outrasinfos
    ];

    connection.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Membro Adicionado com sucesso.");
    });
    //res.send(req.params.limit+req.params.offset);
}

export const addQntMembros = (req, res) => {
    const q =
        "INSERT INTO membros_ativos_mes(`ano`, `mes`, `quantidade`) VALUES(?)";

    const values = [
        req.body.ano,
        req.body.mes,
        req.body.quantidade,
    ];

    connection.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Membro Adicionado com sucesso.");
    });
    //res.send(req.params.limit+req.params.offset);
}

export const addQntMembros2 = (req, res) => {
    const q =
        "INSERT INTO membros_inativos_mes(`ano`, `mes`, `quantidade`) VALUES(?)";

    const values = [
        req.body.ano,
        req.body.mes,
        req.body.quantidade,
    ];

    connection.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Membro Adicionado com sucesso.");
    });
    //res.send(req.params.limit+req.params.offset);
}

export const changeMembro = (req, res) => {
    const q =
        "UPDATE membros SET `nome` = ?, `email` = ?, `celular` = ?, `telefone`  = ?, `genero`  = ?, `nascimento` = ?, `civil` = ?, `cep` = ?, `endereco` = ?, `numero` = ?, `complemento` = ?, `admissao` = ?, `obs_admissao` = ?, `situacao` = ?, `conversao` = ?, `batismo` = ?, `chamado` = ?, `outrasinfos` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.email,
        req.body.celular,
        req.body.telefone,
        req.body.genero,
        req.body.nascimento,
        req.body.civil,
        req.body.cep,
        req.body.endereco,
        req.body.numero,
        req.body.complemento,
        req.body.admissao,
        req.body.obs_admissao,
        req.body.situacao,
        req.body.conversao,
        req.body.batismo,
        req.body.chamado,
        req.body.outrasinfos
    ];

    connection.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Dados do membro atualizados com sucesso");
    });
    //res.send(req.params.limit+req.params.offset);
}

export const changeQntMembros = (req, res) => {
    const q =
        `UPDATE membros_ativos_mes SET quantidade = ${req.body.quantidade} WHERE ano = '${req.body.ano}' AND mes = '${req.body.mes}'`;

    const values = [
        req.body.quantidade,
        req.body.ano,
        req.body.mes
    ];

    connection.query(q, (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Dados do membro atualizados com sucesso");
    });
    //res.send(req.params.limit+req.params.offset);
}

export const changeQntMembros2 = (req, res) => {
    const q =
    `UPDATE membros_inativos_mes SET quantidade = ${req.body.quantidade} WHERE ano = '${req.body.ano}' AND mes = '${req.body.mes}'`;

    const values = [
        req.body.quantidade,
        req.body.ano,
        req.body.mes
    ];

    connection.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Dados do membro atualizados com sucesso");
    });
    //res.send(req.params.limit+req.params.offset);
}

export const deleteMembro = (req, res) => {
    const q = "DELETE FROM membros WHERE `id` = ?";

    connection.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Registro do membro deletado com sucesso.");
    });
};

// FUNÇÕES PARA GERENCIAMENTO DA COMISSÃO DE FINANÇAS

export const getFinancas = (req, res) => {
    const q = `SELECT * FROM comissaofinancas`;
    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

export const addFinancas = (req, res) => {
    const q =
        "INSERT INTO comissaofinancas(`id`, `nome`, `email`, `celular`, `cargo`) VALUES(?)";

    const values = [
        req.body.id,
        req.body.nome,
        req.body.email,
        req.body.celular,
        req.body.cargo,
    ];

    connection.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Membro adicionado a Comissão de Finanças.");
    });
    //res.send(req.params.limit+req.params.offset);
}

export const changeFinancas = (req, res) => {
    const q =
        "UPDATE comissaofinancas SET `cargo` = ? WHERE `id` = ?";

    const values = [
        req.body.cargo,
    ];

    connection.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Cargo do Membro atualizado com sucesso.");
    });
    //res.send(req.params.limit+req.params.offset);
}

export const deleteFianancas = (req, res) => {
    const q = "DELETE FROM comissaofinancas WHERE `id` = ?";

    connection.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Membro deletado da Comissão de Finanças.");
    });
};

// FUNÇÕES PARA GERENCIAMENTO DO CORPO DIACONAL

export const getDiaconos = (req, res) => {
    const q = `SELECT * FROM corpodiaconal`;
    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

export const addDiaconos = (req, res) => {
    const q =
        "INSERT INTO corpodiaconal(`id`, `nome`, `email`, `celular`, `cargo`) VALUES(?)";

    const values = [
        req.body.id,
        req.body.nome,
        req.body.email,
        req.body.celular,
        req.body.cargo,
    ];

    connection.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Membro adicionado ao Corpo Diaconal.");
    });
    //res.send(req.params.limit+req.params.offset);
}

export const changeDiaconos = (req, res) => {
    const q =
        "UPDATE corpodiaconal SET `cargo` = ? WHERE `id` = ?";

    const values = [
        req.body.cargo,
    ];

    connection.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Cargo do Membro atualizado com sucesso.");
    });
    //res.send(req.params.limit+req.params.offset);
}

export const deleteDiaconos = (req, res) => {
    const q = "DELETE FROM corpodiaconal WHERE `id` = ?";

    connection.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Membro deletado do Corpo Diaconal.");
    });
};

// FUNÇÕES PARA GERENCIAMENTO DAS MENSAGEIRAS DO REI

export const getMensageiras = (req, res) => {
    const q = `SELECT * FROM mensageiras`;
    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

export const addMensageiras = (req, res) => {
    const q =
        "INSERT INTO mensageiras(`id`, `nome`, `email`, `celular`, `funcao`, `etapa`, `situacao`, `nascimento`, `outrasinfos`, `responsavel1`, `resp1email`, `resp1contato`, `responsavel2`, `resp2email`, `resp2contato`) VALUES(?)";

    const values = [
        req.body.id,
        req.body.nome,
        req.body.email,
        req.body.celular,
        req.body.funcao,
        req.body.etapa,
        req.body.situacao,
        req.body.nascimento,
        req.body.outrasinfos,
        req.body.responsavel1,
        req.body.resp1email,
        req.body.resp1contato,
        req.body.responsavel2,
        req.body.resp2email,
        req.body.resp2contato,
    ];

    connection.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Membro adicionado as Mensageiras do Rei.");
    });
    // res.send(values);
}

export const changeMensageiras = (req, res) => {
    const q =
        "UPDATE mensageiras SET `funcao` = ?, `etapa` = ?, `situacao` = ?, `outrasinfos` = ?, `responsavel1` = ?, `resp1email` = ?, `resp1contato` = ?, `responsavel2` = ?, `resp2email` = ?, `resp2contato` = ? WHERE `id` = ?";

    const values = [
        req.body.funcao,
        req.body.etapa,
        req.body.situacao,
        req.body.outrasinfos,
        req.body.responsavel1,
        req.body.resp1email,
        req.body.resp1contato,
        req.body.responsavel2,
        req.body.resp2email,
        req.body.resp2contato,
    ];

    connection.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Dados da Mensageira Atualizados com sucesso");
    });
    //res.send(req.params.limit+req.params.offset);
}

export const deleteMensageiras = (req, res) => {
    const q = "DELETE FROM mensageiras WHERE `id` = ?";

    connection.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Membro deletado das Mensageiras do Rei.");
    });
};

// GERENCIAMENTO DAS CONTAS BANCÁRIAS
export const getContas = (req, res) => {
    const q = `SELECT * FROM conta_bancaria`;
    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

export const checkConta = (req, res) => {
    const q = `SELECT * FROM lancamentos WHERE id_banco = ?`;
    connection.query(q, [req.params.id], (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

export const addConta = (req, res) => {
    const q =
        "INSERT INTO conta_bancaria(`nome`, `agencia`, `conta`, `tipo`) VALUES(?)";

    const values = [
        req.body.nome,
        req.body.agencia,
        req.body.conta,
        req.body.tipo,
    ];

    connection.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Conta Bancária adicionada com sucesso.");
    });
    // res.send(values);
}

export const changeConta = (req, res) => {
    const q =
        "UPDATE conta_bancaria SET `nome` = ?, `agencia` = ?, `conta` = ?, `tipo` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.agencia,
        req.body.conta,
        req.body.tipo,
    ];

    connection.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Dados da Conta Bancária Atualizados com sucesso");
    });
    //res.send(req.params.limit+req.params.offset);
}

export const deleteConta = (req, res) => {
    const q = "DELETE FROM conta_bancaria WHERE `id` = ?";

    connection.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Conta Bancária deletada com sucesso.");
    });
};