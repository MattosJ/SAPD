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
  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      senha VARCHAR(255) NOT NULL
    );
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

  console.log('Tabelas verificadas/criadas');
  await pool.end();
}
