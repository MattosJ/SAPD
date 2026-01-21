import express from 'express';
import { initDatabase } from './src/database/initDatabase.js';
import usuariosRoutes from './src/routes/usuarios.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import glicemiaRoutes from './src/routes/glicemia.routes.js';
import insulinaRoutes from './src/routes/insulina.routes.js';
import alimentosRoutes from './src/routes/alimentos.routes.js';
import refeicoesRoutes from './src/routes/refeicoes.routes.js';
import lembretesRoutes from './src/routes/lembretes.routes.js';
import planosAlimentaresRoutes from './src/routes/planosAlimentares.routes.js';
import predicoesRoutes from './src/routes/predicoes.routes.js';
import relatoriosRoutes from './src/routes/relatorios.routes.js';
import comparacaoRoutes from './src/routes/comparacao.routes.js';
import alertasRoutes from './src/routes/alertas.routes.js';


const app = express();
app.use(express.json());
await initDatabase();


app.use('/api/usuarios', usuariosRoutes);
app.use('/api', authRoutes);
app.use('/api/glicemia', glicemiaRoutes);
app.use('/api/insulina', insulinaRoutes);
app.use('/api/alimentos', alimentosRoutes);
app.use('/api/refeicoes', refeicoesRoutes);
app.use('/api/lembretes', lembretesRoutes);
app.use('/api/planos-alimentares', planosAlimentaresRoutes);
app.use('/api/predicoes', predicoesRoutes);
app.use('/api/relatorios', relatoriosRoutes);
app.use('/api/comparacao', comparacaoRoutes);
app.use('/api/alertas', alertasRoutes);


app.listen(3000, () => {
  console.log('Servidor SAPD rodando na porta 3000');
});
