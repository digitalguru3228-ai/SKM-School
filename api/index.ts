import express from 'express';
import { router as apiRouter } from '../server/api';

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoints
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', environment: 'vercel-serverless', time: new Date().toISOString() });
});
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', environment: 'vercel-serverless', time: new Date().toISOString() });
});

// Route handlers for Vercel Serverless environment
app.use('/api', apiRouter);
app.use('/', apiRouter);

// Global Error Handler guaranteeing JSON responses instead of HTML
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[API Serverless Error]:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err?.message || 'Internal Server Error'
  });
});

export default function handler(req: any, res: any) {
  // Always guarantee JSON content type header
  res.setHeader('Content-Type', 'application/json');

  // Normalize req.url if Vercel serverless slug passed
  if (req.query && req.query.slug) {
    const slugPath = Array.isArray(req.query.slug) ? req.query.slug.join('/') : req.query.slug;
    const queryString = req.url && req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    if (req.url && !req.url.startsWith(`/${slugPath}`) && !req.url.startsWith(`/api/${slugPath}`)) {
      req.url = `/${slugPath}${queryString}`;
    }
  }

  try {
    return app(req, res);
  } catch (err: any) {
    console.error('[API Handler Uncaught]:', err);
    return res.status(500).json({
      success: false,
      error: err?.message || 'Serverless function execution failure'
    });
  }
}

