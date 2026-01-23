import bcrypt from 'bcrypt';
import db from './connection.js';

async function seed() {
  console.log('🌱 Iniciando seed completo do SAPD...');

  /* ===============================
     1️⃣ USUÁRIOS
  =============================== */
  const usuarios = [
    {
      nome_completo: 'Ana Souza',
      email: 'ana@sapd.com',
      senha: '123456',
      tipo_diabetes: 'Tipo 1',
      peso: 60,
      altura: 1.65
    },
    {
      nome_completo: 'Bruno Lima',
      email: 'bruno@sapd.com',
      senha: '123456',
      tipo_diabetes: 'Tipo 2',
      peso: 85,
      altura: 1.78
    },
    {
      nome_completo: 'Carla Mendes',
      email: 'carla@sapd.com',
      senha: '123456',
      tipo_diabetes: 'Gestacional',
      peso: 70,
      altura: 1.62
    },
    {
      nome_completo: 'Daniel Rocha',
      email: 'daniel@sapd.com',
      senha: '123456',
      tipo_diabetes: 'Tipo 2',
      peso: 92,
      altura: 1.80
    },
    {
      nome_completo: 'Eduarda Alves',
      email: 'eduarda@sapd.com',
      senha: '123456',
      tipo_diabetes: 'Tipo 1',
      peso: 55,
      altura: 1.60
    }
  ];

  for (const u of usuarios) {
    const hash = await bcrypt.hash(u.senha, 10);
    await db.query(
      `
      INSERT INTO usuarios
      (nome_completo, email, senha, tipo_diabetes, peso, altura)
      VALUES ($1,$2,$3,$4,$5,$6)
      ON CONFLICT (email) DO NOTHING
      `,
      [u.nome_completo, u.email, hash, u.tipo_diabetes, u.peso, u.altura]
    );
  }

  const { rows: usuariosDB } =
    await db.query(`SELECT id FROM usuarios ORDER BY id`);

  /* ===============================
     2️⃣ ALIMENTOS
  =============================== */
  const alimentos = [
    ['Arroz branco', 'Carboidrato', 130, 0.3, 2.5, 28, 'B1'],
    ['Feijão', 'Leguminosa', 76, 0.5, 4.8, 13, 'Ferro'],
    ['Frango grelhado', 'Proteína', 165, 3.6, 31, 0, 'B6'],
    ['Maçã', 'Fruta', 52, 0.2, 0.3, 14, 'C'],
    ['Pão integral', 'Carboidrato', 247, 4.2, 13, 41, 'B']
  ];

  for (const a of alimentos) {
    await db.query(
      `
      INSERT INTO alimentos
      (nome, tipo, kcal, gorduras, proteinas, carboidratos, vitaminas)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      ON CONFLICT DO NOTHING
      `,
      a
    );
  }

  /* ===============================
     3️⃣ REFEIÇÕES + REFEIÇÃO_ALIMENTOS
  =============================== */
  const { rows: alimentosDB } =
    await db.query(`SELECT id FROM alimentos`);

  for (const usuario of usuariosDB) {
    const refeicao =
      await db.query(
        `
        INSERT INTO refeicoes (usuario_id, tipo, data_hora)
        VALUES ($1,'Almoço',NOW())
        RETURNING id
        `,
        [usuario.id]
      );

    await db.query(
      `
      INSERT INTO refeicao_alimentos
      (refeicao_id, alimento_id, quantidade)
      VALUES ($1,$2,150)
      `,
      [refeicao.rows[0].id, alimentosDB[0].id]
    );
  }

  /* ===============================
     4️⃣ REGISTROS DE GLICEMIA
  =============================== */
  for (const usuario of usuariosDB) {
    await db.query(
      `
      INSERT INTO registros_glicemia
      (usuario_id, valor, data_hora, momento)
      VALUES ($1,120,NOW(),'Jejum')
      `,
      [usuario.id]
    );
  }

  /* ===============================
     5️⃣ INSULINA
  =============================== */
  for (const usuario of usuariosDB) {
    await db.query(
      `
      INSERT INTO registros_insulina
      (usuario_id, quantidade_insulina, tipo, data_hora, momento)
      VALUES ($1,10,'Rápida',NOW(),'Manhã')
      `,
      [usuario.id]
    );
  }

  /* ===============================
     6️⃣ LEMBRETES
  =============================== */
  for (const usuario of usuariosDB) {
    await db.query(
      `
      INSERT INTO lembretes
      (usuario_id, tipo, data_hora, observacoes)
      VALUES ($1,'Medição de glicemia',NOW() + INTERVAL '1 hour','Teste')
      `,
      [usuario.id]
    );
  }

  /* ===============================
     7️⃣ PLANO ALIMENTAR
  =============================== */
  for (const usuario of usuariosDB) {
    const plano =
      await db.query(
        `
        INSERT INTO planos_alimentares
        (usuario_id, descricao, data_inicio, data_fim)
        VALUES ($1,'Plano padrão',CURRENT_DATE,CURRENT_DATE + 7)
        RETURNING id
        `,
        [usuario.id]
      );

    const refeicaoPlano =
      await db.query(
        `
        INSERT INTO plano_refeicoes
        (plano_id, tipo, horario)
        VALUES ($1,'Almoço','12:00')
        RETURNING id
        `,
        [plano.rows[0].id]
      );

    await db.query(
      `
      INSERT INTO plano_refeicao_alimentos
      (plano_refeicao_id, alimento_id, quantidade)
      VALUES ($1,$2,100)
      `,
      [refeicaoPlano.rows[0].id, alimentosDB[0].id]
    );
  }

  /* ===============================
     8️⃣ PREDIÇÕES
  =============================== */
  for (const usuario of usuariosDB) {
    await db.query(
      `
      INSERT INTO predicoes_glicemia
      (usuario_id, glicemia_prevista, data_hora)
      VALUES ($1,140,NOW())
      `,
      [usuario.id]
    );
  }

  /* ===============================
     9️⃣ ALERTAS
  =============================== */
  for (const usuario of usuariosDB) {
    await db.query(
      `
      INSERT INTO alertas
      (usuario_id, tipo, mensagem, nivel)
      VALUES ($1,'glicemia','Glicemia fora do limite','aviso')
      `,
      [usuario.id]
    );
  }

  console.log('✅ SEED COMPLETO FINALIZADO COM SUCESSO');
  process.exit();
}

seed().catch(err => {
  console.error('❌ ERRO NO SEED:', err);
  process.exit(1);
});
