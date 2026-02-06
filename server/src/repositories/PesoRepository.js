import db from '../database/connection.js';

class PesoRepository {
  async criar(usuario_id, peso) {
    const result = await db.query(`
      INSERT INTO registros_peso (usuario_id, peso)
      VALUES ($1,$2)
      RETURNING *
    `, [usuario_id, peso]);

    return result.rows[0];
  }

}

export default new PesoRepository();
