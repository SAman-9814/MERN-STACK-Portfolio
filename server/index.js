import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import { uploadDir } from './middlewares/upload.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares (Configure CORP to allow cross-origin images to load)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS — allow local dev and all production Vercel deployments
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  /\.vercel\.app$/,           // any *.vercel.app subdomain
  /^https:\/\/www\.amansah\.com\.np$/, // custom domain
];
app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server / curl (no Origin header) and whitelisted origins
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some(o =>
      typeof o === 'string' ? o === origin : o.test(origin)
    );
    if (allowed) return callback(null, true);
    callback(new Error(`CORS: origin "${origin}" not allowed`));
  },
  credentials: true,
}));

// Standard Middlewares
app.use(express.json());

// Serve static uploads folder at /api/uploads
app.use('/api/uploads', express.static(uploadDir));

// Ensure DB is connected before handling any request (critical for Vercel cold starts)
await connectDB();

// Rate limiting for public Contact Form submissions
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 contact messages per hour
  message: { success: false, message: 'Too many messages sent from this IP. Please try again after an hour.' }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/resume', resumeRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send(`<h1>This is Aman Sah</h1>`);
});

// Start Server locally
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
