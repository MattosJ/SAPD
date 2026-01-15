-- ============================
-- TABELA: usuarios
-- ============================
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL
);

-- ============================
-- TABELA: registros_glicemia
-- ============================
CREATE TABLE registros_glicemia (
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
