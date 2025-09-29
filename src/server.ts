import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRouter from './routes/weather';
import govSchemesRouter from './routes/govschemes';
import chatRouter from './routes/chat';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// prefix API
app.use('/api/weather', weatherRouter);
app.use('/api/govschemes', govSchemesRouter);
app.use('/api/chat', chatRouter);

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Project Bolt backend is running' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});