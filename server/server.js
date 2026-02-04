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
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/docs/swagger.js';
import refeicaoAlimentosRoutes from './src/routes/refeicaoAlimentos.routes.js';
import cors from 'cors';
import fs from 'fs';
import 'dotenv/config';



const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
await initDatabase();
app.use('/api/usuario', usuariosRoutes);
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
app.use('/api/refeicaoAlimentos',refeicaoAlimentosRoutes);

/*try {
  fs.writeFileSync('./swagger-output.json', JSON.stringify(swaggerSpec, null, 2));
  console.log(" Arquivo swagger-output.json gerado com sucesso!");
} catch (err) {
  console.error(" Erro ao salvar o arquivo do Swagger:", err);
}*/


app.listen(3000, () => {
  console.log('Servidor SAPD rodando na porta 3000');
});
