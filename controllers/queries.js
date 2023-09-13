import { connection } from "../connection.js";

// FUNÇÕES PARA DOS MEMBROS

export const getMembro = (req, res) => {
    const q = `SELECT * FROM membros`;
    connection.query(q, (err, data) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Erro ao retornar os dados',
            data: err
        });
        return res.status(200).json({
            error: false,
            message: 'Dados retornados com sucesso',
            data: data
        });
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
    if (mes < 10) {
        mes = '0' + mes;
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
    if (mes < 10) {
        mes = '0' + mes;
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
    if (mes < 10 && mes > 1) {
        mes = mes - 1;
        mes = '0' + mes;
    } else if (mes == 1) {
        ano = dataAtual.getFullYear() - 1;
        mes = 12;
    } else if (mes == 10) {
        mes = '0' + (mes - 1);
    } else {
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
    if (mes < 10) {
        mes = '0' + mes;
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
        "INSERT INTO membros(`nome`, `email`, `celular`, `telefone`, `genero`, `nascimento`, `civil`, `data_casamento`, `cep`, `endereco`, `numero`, `complemento`, `admissao`, `data_admissao`, `situacao`, `conversao`, `batismo`, `chamado`, `outrasinfos`, `foto`) VALUES(?)";

    const values = [
        req.body.nome,
        req.body.email,
        req.body.celular,
        req.body.telefone,
        req.body.genero,
        req.body.nascimento,
        req.body.civil,
        req.body.data_casamento,
        req.body.cep,
        req.body.endereco,
        req.body.numero,
        req.body.complemento,
        req.body.admissao,
        req.body.data_admissao,
        req.body.situacao,
        req.body.conversao,
        req.body.batismo,
        req.body.chamado,
        req.body.outrasinfos,
        req.file.firebaseUrl
    ];

    connection.query(q, [values], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Erro ao tentar criar o novo membro. Entre em contato com o administrador do sistema ou tente novamente mais tarde.',
            err
        });

        return res.status(200).json({
            error: false,
            message: "Membro Adicionado com sucesso."
        });
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
        "UPDATE membros SET `nome` = ?, `email` = ?, `celular` = ?, `telefone`  = ?, `genero`  = ?, `nascimento` = ?, `civil` = ?, `data_casamento` = ?, `cep` = ?, `endereco` = ?, `numero` = ?, `complemento` = ?, `admissao` = ?, `data_admissao` = ?, `situacao` = ?, `conversao` = ?, `batismo` = ?, `chamado` = ?, `outrasinfos` = ?, `foto` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.email,
        req.body.celular,
        req.body.telefone,
        req.body.genero,
        req.body.nascimento,
        req.body.civil,
        req.body.data_casamento,
        req.body.cep,
        req.body.endereco,
        req.body.numero,
        req.body.complemento,
        req.body.admissao,
        req.body.data_admissao,
        req.body.situacao,
        req.body.conversao,
        req.body.batismo,
        req.body.chamado,
        req.body.outrasinfos,
        req.file.firebaseUrl
    ];

    connection.query(q, [...values, req.params.id], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Dados do membro atualizados com sucesso."
        });
        
    });
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
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Registro do membro deletado com sucesso."
        });
        
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

export const checkContaReceita = (req, res) => {
    const q = `SELECT COALESCE(SUM(valor),0) AS valor From lancamentos WHERE id_banco = ? AND status = 'Pago' AND categoria = 'Receita'`;
    // const q = `Select format(SUM(valor),2,'pt_BR') AS valor From tabela_teste WHERE id = ?;`;
    connection.query(q, [req.params.id], (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

export const checkContaDespesa = (req, res) => {
    const q = `SELECT COALESCE(SUM(valor),0) AS valor From lancamentos WHERE id_banco = ? AND status = 'Pago' AND categoria = 'Despesa'`;
    // const q = `Select format(SUM(valor),2,'pt_BR') AS valor From tabela_teste WHERE id = ?;`;
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
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Conta Bancária adicionada com sucesso."
        });
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
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Dados da Conta Bancária Atualizados com sucesso"
        });
        
    });
    //res.send(req.params.limit+req.params.offset);
}

export const deleteConta = (req, res) => {
    const q = "DELETE FROM conta_bancaria WHERE `id` = ?";

    connection.query(q, [req.params.id], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });
        
        return res.status(200).json({
            error: false,
            message: "Conta Bancária deletada com sucesso."
        });
        
    });
};

// GERENCIMENTO DOS CENTROS DE CUSTO
export const getCustos = (req, res) => {
    const q = `SELECT * FROM centro_custo`;
    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

export const addCusto = (req, res) => {
    const q =
        "INSERT INTO centro_custo(`nome`) VALUES(?)";

    const values = [
        req.body.nome,
    ];

    connection.query(q, [values], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Centro de Custo adicionado com sucesso."
        });

    });
    // res.send(values);
}

export const changeCusto = (req, res) => {
    const q =
        "UPDATE centro_custo SET `nome` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
    ];

    connection.query(q, [...values, req.params.id], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Dados do Centro de Custo Atualizados com sucesso"
        });
        
    });
    //res.send(req.params.limit+req.params.offset);
}

export const deleteCusto = (req, res) => {
    const q = "DELETE FROM centro_custo WHERE `id` = ?";

    connection.query(q, [req.params.id], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Centro de Custo deletado com sucesso."
        });
        
    });
};

// GERENCIMENTO DOS PLANOS DE CONTA
export const getPlano = (req, res) => {
    const q = `SELECT * FROM plano_contas`;
    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

export const getPlanoReceita = (req, res) => {
    const q = `SELECT * FROM plano_contas WHERE tipo = 'Receitas'`;
    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

export const getPlanoDespesa = (req, res) => {
    const q = `SELECT * FROM plano_contas WHERE tipo = 'Despesas'`;
    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

export const addPlano = (req, res) => {
    const q =
        "INSERT INTO plano_contas(`nome`, `tipo`) VALUES(?)";

    const values = [
        req.body.nome,
        req.body.tipo,
    ];

    connection.query(q, [values], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Plano de Contas adicionado com sucesso."
        });
        
    });
    // res.send(values);
}

export const changePlano = (req, res) => {
    const q =
        "UPDATE plano_contas SET `nome` = ?, `tipo` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.tipo,
    ];

    connection.query(q, [...values, req.params.id], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Dados do Plano de Contas Atualizados com sucesso."
        });
        
    });
    //res.send(req.params.limit+req.params.offset);
}

export const deletePlano = (req, res) => {
    const q = "DELETE FROM plano_contas WHERE `id` = ?";

    connection.query(q, [req.params.id], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Plano de Contas deletado com sucesso."
        });
        
    });
};

// GERENCIMENTO DO CADASTRO DE PESSOAS/FORNECEDORES PARA PAGAMENTO
export const getFornecedor = (req, res) => {
    const q = `SELECT * FROM pessoa_fornecedor`;
    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

export const addFornecedor = (req, res) => {
    const q =
        "INSERT INTO pessoa_fornecedor(`nome`, `cpf_cnpj`, `contato`) VALUES(?)";

    const values = [
        req.body.nome,
        req.body.documento,
        req.body.contato,
    ];

    connection.query(q, [values], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Pessoa/Fornecedor criado com sucesso."
        });

    });
    // res.send(values);
}

export const changeFornecedor = (req, res) => {
    const q =
        "UPDATE pessoa_fornecedor SET `nome` = ?, `cpf_cnpj` = ?, `contato` = ? WHERE `id` = ?";

    const values = [
        req.body.nome,
        req.body.documento,
        req.body.contato,
    ];

    connection.query(q, [...values, req.params.id], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Dados da Pessoa/Fornecedor Atualizados com sucesso."
        });
        
    });
    //res.send(req.params.limit+req.params.offset);
}

export const deleteFornecedor = (req, res) => {
    const q = "DELETE FROM pessoa_fornecedor WHERE `id` = ?";

    connection.query(q, [req.params.id], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Pessoa/Fornecedor deletado com sucesso."
        });
        
    });
};

// RETORNAR VALORES DOS PAGAMENTOS E RECEBIMENTOS PENDENTES
export const getRecebimentos = (req, res) => {

    const q = `SELECT SUM(valor) AS valor FROM lancamentos WHERE data < '${req.params.date}' AND categoria = 'Receita' AND status = 'Não Pago';`;

    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

export const getPagamentos = (req, res) => {
    const q = `SELECT SUM(valor) AS valor FROM lancamentos WHERE data < '${req.params.date}' AND categoria = 'Despesa' AND status = 'Não Pago';`;
    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

// RETORNOS DA PÁGINA DE TRANSAÇÕES
export const getTransacoes = (req, res) => {
    const q = `SELECT * FROM lancamentos WHERE data >= '${req.params.init}' AND data <= '${req.params.end}' order by data ASC;`;

    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset); 
};

export const getLastIdr = (req, res) => {
    const q = `SELECT MAX(id_recorrencia) as idr FROM lancamentos`;

    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset); 
};

export const getLastLancamentos = (req, res) => {
    const q = `SELECT * FROM lancamentos ORDER BY data DESC LIMIT 10`;

    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset); 
};

export const addTransacao = (req, res) => {
    const q =
        "INSERT INTO lancamentos(`data`, `descricao`, `id_banco`, `nome_banco`, `id_pessoa_fornecedor`, `nome_pessoa_fornecedor`, `id_centro_custo`, `nome_centro_custo`, `id_plano_contas`, `nome_plano_contas`, `meio_pagamento`, `categoria`, `valor`, `status`, `id_recorrencia`) VALUES(?)";

    const values = [
        req.body.data,
        req.body.descricao,
        req.body.idbanco,
        req.body.banco,
        req.body.idfornecedor,
        req.body.fornecedor,
        req.body.idcusto,
        req.body.custo,
        req.body.idplano,
        req.body.plano,
        req.body.pagamento,
        req.body.categoria,
        req.body.valor,
        req.body.status,
        req.body.idr
    ];

    // res.send(q);
    connection.query(q, [values], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Lançamento adicionado com sucesso."
        });

    });
}

export const changeTransacao = (req, res) => {
    const q =
        "UPDATE lancamentos SET `data` = ?, `descricao` = ?, `id_banco` = ?, `nome_banco` = ?, `id_pessoa_fornecedor` = ?, `nome_pessoa_fornecedor` = ?, `id_centro_custo` = ?, `nome_centro_custo` = ?, `id_plano_contas` = ?, `nome_plano_contas` = ?, `meio_pagamento` = ?, `categoria` = ?, `valor` = ?, `status` = ? WHERE `id` = ?";

    const values = [
        req.body.data,
        req.body.descricao,
        req.body.idbanco,
        req.body.banco,
        req.body.idfornecedor,
        req.body.fornecedor,
        req.body.idcusto,
        req.body.custo,
        req.body.idplano,
        req.body.plano,
        req.body.pagamento,
        req.body.categoria,
        req.body.valor,
        req.body.status
    ];

    connection.query(q, [...values, req.params.id], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Dados do lançamento Atualizados com sucesso."
        });
        
    });
    //res.send(req.params.limit+req.params.offset); 
}

export const changeStatus = (req, res) => {
    const q =
        "UPDATE lancamentos SET `status` = ? WHERE `id` = ?";

    const values = [
        req.body.status
    ];

    connection.query(q, [...values, req.params.id], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Status do lançamento Atualizado com sucesso."
        });
        
    });
    //res.send(req.params.limit+req.params.offset); 
}

export const deleteLancamento = (req, res) => {
    const q = "DELETE FROM lancamentos WHERE `id` = ?";

    connection.query(q, [req.params.id], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Lançamento deletado com sucesso."
        });
        
    });
};

export const deleteLancamento2 = (req, res) => {
    const q = "DELETE FROM lancamentos WHERE `id_recorrencia` = ?";

    connection.query(q, [req.params.idr], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Lançamento deletado com sucesso."
        });
        
    });
};

export const getReceitasAno = (req, res) => {
    const q = `SELECT * FROM lancamentos WHERE data >= '${req.params.init}' AND data <= '${req.params.end}' AND categoria = 'Receita' AND status = 'Pago'`;

    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset); 
};

export const getDespesasAno = (req, res) => {
    const q = `SELECT * FROM lancamentos WHERE data >= '${req.params.init}' AND data <= '${req.params.end}' AND categoria = 'Despesa' AND status = 'Pago'`;

    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset); 
};

// GERENCIAMENTO DE EQUIPES
export const getEquipes = (req, res) => {
    const q = `SELECT * FROM equipes WHERE id_membro IS NULL`;
    connection.query(q, (err, data) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });
        return res.status(200).json({
            error: false,
            message: "Dados do Usuário alterados com sucesso.",
            data
        });
    })
    //res.send(req.params.limit+req.params.offset);
};

export const getMembrosEquipe = (req, res) => {
    const q = `SELECT * FROM equipes WHERE id_equipe = ? AND nome_membro IS NOT NULL`;
    connection.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });
        return res.status(200).json({
            error: false,
            message: "Dados do Usuário alterados com sucesso.",
            data
        });
    })
    //res.send(req.params.limit+req.params.offset);
};

export const getMembroEquipe = (req, res) => {
    const q = `SELECT * FROM membros WHERE id = ?`;
    connection.query(q, [req.params.id], (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

export const checkMembroEquipe = (req, res) => {
    const q = `SELECT * FROM equipes WHERE id_membro = ? AND id_equipe = ?`;
    connection.query(q, [req.params.id, req.params.equipe], (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset);
};

export const addEquipe = (req, res) => {
    const q =
        "INSERT INTO equipes(`id_equipe`, `nome_equipe`) VALUES(?)";

    const values = [
        req.body.id_equipe,
        req.body.nome,
    ];

    // res.send(q);
    // connection.query(q, [values], (err) => {
    //     if (err) return res.json(err);

    //     return res.status(200).json(`${req.body.nome} criada com sucesso.`);
    // });

    connection.query(q, [values], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Erro ao tentar criar o nova equipe. Entre em contato com o administrador do sistema ou tente novamente mais tarde.',
            err
        });

        return res.status(200).json({
            error: false,
            message: "Membro Adicionado com sucesso."
        });
    });
}

export const addMembroEquipe = (req, res) => {
    const q =
        "INSERT INTO equipes(`id_equipe`, `nome_equipe`, `id_membro`, `nome_membro`, `funcao`) VALUES(?)";

    const values = [
        req.body.id_equipe,
        req.body.nome_equipe,
        req.body.id_membro,
        req.body.nome_membro,
        req.body.funcao
    ];

    // res.send(q);
    connection.query(q, [values], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: `Membro adicionado a Equipe ${req.body.nome_equipe} com sucesso.`
        });
    });
}

export const getLastequipe = (req, res) => {
    const q = `SELECT MAX(id_equipe) as id_equipe FROM equipes`;

    connection.query(q, (err, data) => {
        if (err) return res.json('Erro ao retornar os dados');
        return res.status(200).json(data);
    })
    //res.send(req.params.limit+req.params.offset); 
};

export const deleteEquipe = (req, res) => {
    const q = "DELETE FROM equipes WHERE `id_equipe` = ?";

    connection.query(q, [req.params.id], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Equipe deletada com sucesso."
        });
    });
};

export const deleteMembroEquipe = (req, res) => {
    const q = "DELETE FROM equipes WHERE `id_membro` = ?";

    connection.query(q, [req.params.id], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Membro removido com sucesso."
        });
    });
};

export const changeEquipe = (req, res) => {
    const q =
        "UPDATE equipes SET `nome_equipe` = ? WHERE `id_equipe` = ?";

    const values = [
        req.body.nome
    ];

    connection.query(q, [...values, req.params.id], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Equipe atualizada com sucesso."
        });
    });
    //res.send(req.params.limit+req.params.offset); 
}

export const changeMembroEquipe = (req, res) => {
    const q =
        "UPDATE equipes SET `funcao` = ? WHERE `id_membro` = ?";

    const values = [
        req.body.funcao
    ];

    connection.query(q, [...values, req.params.id], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Função atualizada com sucesso."
        });
    });
    //res.send(req.params.limit+req.params.offset); 
}

export const getUsers = (req, res) => {
    const q = `SELECT * FROM users;`;

    connection.query(q, (err, data) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Erro ao retornar os dados',
            data: err
        });
        return res.status(200).json({
            error: false,
            message: 'Dados retornados com sucesso.',
            data: data
        });
    })
    //res.send(req.params.limit+req.params.offset); 
};

export const deleteUser = (req, res) => {
    const q = "DELETE FROM users WHERE `id` = ?";

    connection.query(q, [req.params.id], (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao tentar deletar o usuário. Entre em contato com o administrador do sistema ou tente novamente mais tarde.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Usuário removido com sucesso."
        });
    });
};

export const changeUser = (req, res) => {
    let q = '';
    if(req.file.firebaseUrl){
        q = `UPDATE users SET email = '${req.body.email}', nome = '${req.body.nome}', super = '${req.body.super}', changemembros = '${req.body.changemembros}', viewequipes = '${req.body.viewequipes}', createequipes = '${req.body.createequipes}', viewfinancas = '${req.body.viewfinancas}', createfinancas = '${req.body.createfinancas}', foto = '${req.file.firebaseUrl}' WHERE id = ${req.params.id}`;
    }else{
        q = `UPDATE users SET email = '${req.body.email}', nome = '${req.body.nome}', super = '${req.body.super}', changemembros = '${req.body.changemembros}', viewequipes = '${req.body.viewequipes}', createequipes = '${req.body.createequipes}', viewfinancas = '${req.body.viewfinancas}', createfinancas = '${req.body.createfinancas}' WHERE id = ${req.params.id}`;
    }

    connection.query(q, (err) => {
        if (err) return res.status(500).json({
            error: true,
            message: 'Ocorreu um erro ao realizar a operação. Tente novamente mais tarde ou contate o administrador.',
            data: err
        });

        return res.status(200).json({
            error: false,
            message: "Dados do Usuário alterados com sucesso.",
            foto: req.file.firebaseUrl ? req.file.firebaseUrl : null
        });
    });

    // res.send(superAdmin); 
}