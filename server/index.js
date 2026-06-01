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
import { uploadDir } from './middlewares/upload.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares (Configure CORP to allow cross-origin images to load)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Standard Middlewares
app.use(cors());
app.use(express.json());

// Serve static uploads folder at /api/uploads
app.use('/api/uploads', express.static(uploadDir));

// Connect to Database & seed admin
connectDB();

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

// Default Route
app.get("/", (req, res) => {
  res.send(`<h1>This is Aman Sah</h1>`);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
