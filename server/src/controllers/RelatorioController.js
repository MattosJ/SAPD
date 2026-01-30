import RelatorioService from '../services/RelatorioService.js';
import gerarRelatorioPDF from '../utils/gerarRelatorioPDF.js';
import db from '../database/connection.js';

class RelatorioController {

  async gerar(req, res) {
    const { dataInicio, dataFim } = req.query;

    const dados =
      await RelatorioService.gerar(
        req.usuarioId,
        dataInicio,
        dataFim
      );

    gerarRelatorioPDF(dados, res);
  }
  async buscarGeral(req, res) {


    const usuarioId = req.usuario?.id;
    console.log("UsuarioID usado:", usuarioId);

    try {

      const glicemia = await db.query(`
        SELECT 
          TO_CHAR(data_hora, 'DD/MM HH24:MI') AS name,
          valor
        FROM registros_glicemia
        WHERE usuario_id = $1
        ORDER BY data_hora
      `, [usuarioId]);

      const peso = await db.query(`
        SELECT 
          TO_CHAR(NOW(), 'DD/MM') AS name,
          peso AS valor
        FROM usuarios
        WHERE id = $1
          AND peso IS NOT NULL
      `, [usuarioId]);

      return res.json({
        glicemia: glicemia.rows,
        peso: peso.rows
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao gerar relatório' });
    }
  }
}

export default new RelatorioController();
