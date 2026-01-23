import pkg from 'pg';
const { Pool } = pkg;

// conexão TEMPORÁRIA (banco postgres)
const adminPool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '87654321',
  database: 'postgres',
  port: 5432
});

export async function initDatabase() {
  try {
    // Criar banco se não existir
    await adminPool.query(`
      CREATE DATABASE sapd
      WITH ENCODING 'UTF8'
      TEMPLATE template0
    `);
    console.log('Banco sapd criado');
  } catch (error) {
    if (error.code === '42P04') {
      console.log('Banco sapd já existe');
    } else {
      throw error;
    }
  }

  // fecha conexão admin
  await adminPool.end();

  // 2️⃣ Conectar no banco sapd
  const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '87654321',
    database: 'sapd',
    port: 5432
  });

  // 3️⃣ Criar tabelas
// Tabela usuarios (estrutura COMPLETA)
await pool.query(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome_completo VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,

    data_nascimento DATE,
    tipo_diabetes VARCHAR(30),
    peso NUMERIC(5,2),
    altura NUMERIC(4,2),
    foto_perfil TEXT,

    status_conta VARCHAR(20) NOT NULL DEFAULT 'ATIVA',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
  );
`);

await pool.query(`
  ALTER TABLE usuarios
  ADD COLUMN IF NOT EXISTS data_nascimento DATE,
  ADD COLUMN IF NOT EXISTS tipo_diabetes VARCHAR(30),
  ADD COLUMN IF NOT EXISTS peso NUMERIC(5,2),
  ADD COLUMN IF NOT EXISTS altura NUMERIC(4,2),
  ADD COLUMN IF NOT EXISTS foto_perfil TEXT,
  ADD COLUMN IF NOT EXISTS status_conta VARCHAR(20) NOT NULL DEFAULT 'ATIVA',
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP;
`);


  await pool.query(`
    CREATE TABLE IF NOT EXISTS registros_glicemia (
      id SERIAL PRIMARY KEY,
      valor INTEGER NOT NULL,
      data_hora TIMESTAMP NOT NULL,
      momento VARCHAR(20),
      observacao TEXT,
      usuario_id INTEGER NOT NULL,
      CONSTRAINT fk_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS registros_insulina (
      id SERIAL PRIMARY KEY,
      usuario_id INTEGER NOT NULL,
      quantidade_insulina NUMERIC(5,2) NOT NULL,
      tipo VARCHAR(30),
      data_hora TIMESTAMP NOT NULL,
      momento VARCHAR(30),
      observacoes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_usuario_insulina
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
    );
  `);

// Tabela de alimentos
await pool.query(`
  CREATE TABLE IF NOT EXISTS alimentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50),
    kcal NUMERIC(6,2),
    gorduras NUMERIC(6,2),
    proteinas NUMERIC(6,2),
    carboidratos NUMERIC(6,2),
    vitaminas TEXT
  );
`);

// Tabela de refeições
await pool.query(`
  CREATE TABLE IF NOT EXISTS refeicoes (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    tipo VARCHAR(50),
    data_hora TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario_refeicao
      FOREIGN KEY (usuario_id)
      REFERENCES usuarios(id)
      ON DELETE CASCADE
  );
`);

// Tabela intermediária (N:N)
await pool.query(`
  CREATE TABLE IF NOT EXISTS refeicao_alimentos (
    refeicao_id INTEGER NOT NULL,
    alimento_id INTEGER NOT NULL,
    quantidade NUMERIC(6,2),
    PRIMARY KEY (refeicao_id, alimento_id),
    CONSTRAINT fk_refeicao
      FOREIGN KEY (refeicao_id)
      REFERENCES refeicoes(id)
      ON DELETE CASCADE,
    CONSTRAINT fk_alimento
      FOREIGN KEY (alimento_id)
      REFERENCES alimentos(id)
      ON DELETE CASCADE
  );
`);

await pool.query(`
  CREATE TABLE IF NOT EXISTS lembretes (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    data_hora TIMESTAMP NOT NULL,
    observacoes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario_lembrete
      FOREIGN KEY (usuario_id)
      REFERENCES usuarios(id)
      ON DELETE CASCADE
  );
`);

// Plano alimentar
await pool.query(`
  CREATE TABLE IF NOT EXISTS planos_alimentares (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    descricao TEXT,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario_plano
      FOREIGN KEY (usuario_id)
      REFERENCES usuarios(id)
      ON DELETE CASCADE
  );
`);

// Refeições previstas no plano
await pool.query(`
  CREATE TABLE IF NOT EXISTS plano_refeicoes (
    id SERIAL PRIMARY KEY,
    plano_id INTEGER NOT NULL,
    tipo VARCHAR(50),
    horario TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_plano_refeicao
      FOREIGN KEY (plano_id)
      REFERENCES planos_alimentares(id)
      ON DELETE CASCADE
  );
`);

// Alimentos previstos em cada refeição do plano
await pool.query(`
  CREATE TABLE IF NOT EXISTS plano_refeicao_alimentos (
    plano_refeicao_id INTEGER NOT NULL,
    alimento_id INTEGER NOT NULL,
    quantidade NUMERIC(6,2),
    PRIMARY KEY (plano_refeicao_id, alimento_id),
    CONSTRAINT fk_plano_refeicao
      FOREIGN KEY (plano_refeicao_id)
      REFERENCES plano_refeicoes(id)
      ON DELETE CASCADE,
    CONSTRAINT fk_alimento_plano
      FOREIGN KEY (alimento_id)
      REFERENCES alimentos(id)
      ON DELETE CASCADE
  );
`);
await pool.query(`
  CREATE TABLE IF NOT EXISTS predicoes_glicemia (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    glicemia_prevista NUMERIC(6,2) NOT NULL,
    data_hora TIMESTAMP NOT NULL,
    confirmada BOOLEAN DEFAULT FALSE,
    glicemia_real NUMERIC(6,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario_predicao
      FOREIGN KEY (usuario_id)
      REFERENCES usuarios(id)
      ON DELETE CASCADE
  );
`);

await pool.query(`
  CREATE TABLE IF NOT EXISTS alertas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    mensagem TEXT NOT NULL,
    nivel VARCHAR(20) DEFAULT 'info', -- info | aviso | critico
    lido BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario_alerta
      FOREIGN KEY (usuario_id)
      REFERENCES usuarios(id)
      ON DELETE CASCADE
  );
`);


  console.log('Tabelas verificadas/criadas');
  await pool.end();
}
