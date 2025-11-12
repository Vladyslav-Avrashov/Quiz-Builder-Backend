import 'dotenv/config';
import { initMongodbConnection } from './config/db.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  try {
    await initMongodbConnection();

    setupServer();
  } catch (error) {
    console.error('Critical error on application startup:', error);
    process.exit(1);
  }
};

bootstrap();
