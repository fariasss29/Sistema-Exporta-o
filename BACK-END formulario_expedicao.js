// src/routes/exportacao/formulario_expedicao.js
import { Router } from "express";
import conn from '@/db/conn';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

router.post('/formulario/exportacao', async (req, res) => {
  try {
    const {
      nome_remetente,
      departamento_remetente,
      ramal,
      centro_custo,
      codigo_cliente_sap,
      empresa,
      endereco,
      data,
      cep,
      contato,
      fone,
      pais,
      fax,
      part_number,
      deposito,
      lote,
      qtd_pecas,
      moeda,
      valor_unit,
      valor_total,
      descricao_material,
      peso_liquido_item,
      peso_bruto_caixa,
      qntd_caixas,
      dimensoes,
      tipo_embalagem,
      material_empilhavel,
      codicoes_faturamento,
      contato_cliente,
      solicitante,
      financeiro,
      modalidade_embarque,
      empresa_embarque,
      pagamento_imposto,
      pagamento_frete,
      empresa_2,
      utilizacao_destino,
      movimentacao_estoque,
      material_retorno,
      caracteriza_devolucao, 
      mobilidade_embarque
    } = req.body

    // para confirmar o que chegou
    console.log('oq ta chegando:', req.body);

    const uuid = uuidv4();

    const sql = `
      INSERT INTO formulario_exportacao
      SET
        uuid                   = ?,
        nome_remetente         = ?,
        departamento_remetente = ?,
        ramal                  = ?,
        data                   = ?,
        centro_custo           = ?,
        codigo_cliente_sap     = ?,
        empresa                = ?,
        endereco               = ?,
        cep                    = ?,
        contato                = ?,
        fone                   = ?,
        pais                   = ?,
        fax                    = ?,
        part_number            = ?,
        deposito               = ?,
        lote                   = ?,
        qtd_pecas              = ?,
        moeda                  = ?,
        valor_unit             = ?,
        valor_total            = ?,
        descricao_material     = ?,
        peso_liquido_item      = ?,
        peso_bruto_caixa       = ?,
        qntd_caixas            = ?,
        dimensoes              = ?,
        tipo_embalagem         = ?,
        material_empilhavel    = ?,
        codicoes_faturamento   = ?,
        contato_cliente        = ?,
        solicitante            = ?,
        financeiro             = ?,
        modalidade_embarque    = ?,
        empresa_embarque       = ?,
        pagamento_imposto      = ?,
        pagamento_frete        = ?,
        empresa_2              = ?,
        utilizacao_destino     = ?,
        movimentacao_estoque   = ?,
        material_retorno       = ?,
        caracteriza_devolucao  = ?,
        mobilidade_embarque    = ?
    `;

    const values = [
      uuid,
      nome_remetente,
      departamento_remetente,
      ramal,
      data,
      centro_custo,
      codigo_cliente_sap,
      empresa,
      endereco,
      cep,
      contato,
      fone,
      pais,
      fax,
      part_number,
      deposito,
      lote,
      qtd_pecas,
      moeda,
      valor_unit,
      valor_total,
      descricao_material,
      peso_liquido_item,
      peso_bruto_caixa,
      qntd_caixas,
      dimensoes,
      tipo_embalagem,
      material_empilhavel,
      codicoes_faturamento,
      contato_cliente,
      solicitante,
      financeiro,
      modalidade_embarque,
      empresa_embarque,
      pagamento_imposto,
      pagamento_frete,
      empresa_2,
      utilizacao_destino,
      movimentacao_estoque,
      material_retorno,
      caracteriza_devolucao,
      mobilidade_embarque
    ];

    await conn.query(sql, values);

    return res.status(201).json({ message: 'Formulário cadastrado com sucesso!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao cadastrar formulário.' });
  }
});

export default router;
