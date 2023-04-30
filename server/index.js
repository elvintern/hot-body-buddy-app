import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import quoteRoutes from './routes/quoteRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'client/dist')));

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/quote', quoteRoutes);
app.use('/api/v1/user', userRoutes);

app.get('/', async (req, res) => {
  res.send('Happy Coding!!');
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(9000, () =>
      console.log('Server has started on port http://localhost:9000')
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
