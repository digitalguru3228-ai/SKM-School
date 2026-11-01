import express from 'express';
import { router as apiRouter } from '../server/api';

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Route handlers for Vercel Serverless environment
app.use('/api', apiRouter);
app.use('/', apiRouter);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', environment: 'vercel-serverless', time: new Date().toISOString() });
});

export default app;
