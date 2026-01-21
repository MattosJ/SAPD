import express from 'express';
import { initDatabase } from './src/database/initDatabase.js';
import usuariosRoutes from './src/routes/usuarios.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import glicemiaRoutes from './src/routes/glicemia.routes.js';

const app = express();

app.use(express.json());
await initDatabase();


app.use('/api/usuarios', usuariosRoutes);
app.use('/api', authRoutes);
app.use('/api/glicemia', glicemiaRoutes);

app.listen(3000, () => {
  console.log('Servidor SAPD rodando na porta 3000');
});
