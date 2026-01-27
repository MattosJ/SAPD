import bcrypt from 'bcrypt';
import db from './connection.js';

async function seed() {
  console.log('🌱 Iniciando seed do SAPD...');

  /* ===============================
     1️⃣ USUÁRIOS
  =============================== */
  const usuarios = [
    {
      nome: 'Ana Souza',
      email: 'ana@sapd.com',
      senha: '123456',
      data_nascimento: '1998-05-01',
      tipo: 'Tipo 1',
      peso: 60,
      altura: 1.65

    },
    {
      nome: 'Bruno Lima',
      email: 'bruno@sapd.com',
      senha: '123456',
      data_nascimento: '1998-05-01',
      tipo: 'Tipo 2',
      peso: 85,
      altura: 1.78
    },
    {
      nome: 'Carla Mendes',
      email: 'carla@sapd.com',
      senha: '123456',
      data_nascimento: '1998-05-01',
      tipo: 'Gestacional',
      peso: 70,
      altura: 1.62
    },
    {
      nome: 'Daniel Rocha',
      email: 'daniel@sapd.com',
      senha: '123456',
      data_nascimento: '1998-05-01',
      tipo: 'Tipo 2',
      peso: 92,
      altura: 1.80
    },
    {
      nome: 'Eduarda Alves',
      email: 'eduarda@sapd.com',
      senha: '123456',
      data_nascimento: '1998-05-01',
      tipo: 'Tipo 1',
      peso: 55,
      altura: 1.60
    }
  ];

  for (const u of usuarios) {
    const hash = await bcrypt.hash(u.senha, 10);
    await db.query(
      `
      INSERT INTO usuarios
      (nome_completo, email, senha, data_nascimento, tipo_diabetes, peso, altura, status_conta)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'ATIVA')
      ON CONFLICT (email) DO NOTHING
      `,
      [u.nome, u.email, hash, u.data_nascimento, u.tipo, u.peso, u.altura]
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

  const { rows: alimentosDB } =
    await db.query(`SELECT id FROM alimentos ORDER BY id`);

  /* ===============================
     3️⃣ REFEIÇÕES + REFEICAO_ALIMENTOS
  =============================== */
  for (const usuario of usuariosDB) {
    const refeicao =
      await db.query(
        `
        INSERT INTO refeicoes
        (usuario_id, tipo, data_hora)
        VALUES ($1,'Almoço',NOW())
        RETURNING id
        `,
        [usuario.id]
      );

    // adiciona 2 alimentos por refeição
    await db.query(
      `
      INSERT INTO refeicao_alimentos
      (refeicao_id, alimento_id, quantidade)
      VALUES 
      ($1,$2,150),
      ($1,$3,100)
      `,
      [
        refeicao.rows[0].id,
        alimentosDB[0].id,
        alimentosDB[2].id
      ]
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
      VALUES ($1,110,NOW(),'Jejum')
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
      VALUES ($1,8,'Rápida',NOW(),'Manhã')
      `,
      [usuario.id]
    );
  }

  /* ===============================
     6️⃣ ALERTAS
  =============================== */
  for (const usuario of usuariosDB) {
    await db.query(
      `
      INSERT INTO alertas
      (usuario_id, tipo, mensagem, nivel)
      VALUES ($1,'alimentação','Alto consumo de carboidratos','aviso')
      `,
      [usuario.id]
    );
  }

  console.log('✅ SEED FINAL EXECUTADO COM SUCESSO');
  process.exit();
}

seed().catch(err => {
  console.error('❌ ERRO NO SEED:', err);
  process.exit(1);
});
