import express from 'express';
import cors from 'cors';
import type { Express, Request, Response } from 'express';
import quizRoutes from './routes/quizRoutes.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const setupServer = () => {
  const app: Express = express();

  app.use(cors());

  app.use(express.json());

  app.get('/', (req: Request, res: Response) => {
    res.send('Quiz API is running!');
  });

  app.use('/api/quizzes', quizRoutes);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(getEnvVar('PORT', '3000'));

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
