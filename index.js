import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import loginRouter from './routes/login.router.js';
import taskRoutes from './routes/task.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', loginRouter);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Agile Sprint Board server is working ' });
});

try {
  await sequelize.authenticate();
  console.log('database is connected');

  app.listen(PORT, () => {
    console.log(`Server running in port : ${PORT}`);
  });
} catch (error) {
  console.error('database is connection is failed', error.message);
}