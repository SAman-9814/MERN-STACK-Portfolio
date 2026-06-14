import multer from 'multer';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { resolveFromRoot } from '../utils/path.js';

// Use writable os.tmpdir() on Vercel, or local folder in development
const isVercel = !!process.env.VERCEL;
const uploadDir = isVercel 
  ? path.join(os.tmpdir(), 'uploads')
  : resolveFromRoot('uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Setup Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter to accept only image formats
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const isMatch = allowedTypes.test(path.extname(file.originalname).toLowerCase()) && allowedTypes.test(file.mimetype);
  if (isMatch) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpg, jpeg, png, gif, webp) are allowed!'), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// File filter to accept only documents (PDF, DOC, DOCX)
const documentFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|msword|vnd.openxmlformats-officedocument.wordprocessingml.document/;
  const isMatch = allowedTypes.test(path.extname(file.originalname).toLowerCase()) && allowedTypes.test(file.mimetype);
  if (isMatch) {
    cb(null, true);
  } else {
    cb(new Error('Only document files (pdf, doc, docx) are allowed!'), false);
  }
};

export const uploadDocument = multer({
  storage: storage,
  fileFilter: documentFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit for documents
});

export { uploadDir };
