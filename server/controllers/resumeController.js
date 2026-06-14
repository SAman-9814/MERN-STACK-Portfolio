import fs from 'fs';
import cloudinary from '../config/cloudinary.js';
import Resume from '../models/Resume.js';

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded or invalid file format' });
    }

    // Check config
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      fs.unlink(req.file.path, () => {});
      return res.status(500).json({ message: 'Cloudinary configuration is missing on the server.' });
    }

    const originalName = req.file.originalname;

    // Upload to Cloudinary. resource_type: 'raw' is REQUIRED for PDF/Word documents.
    // We pass use_filename so Cloudinary keeps the original name in the URL if possible.
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'portfolio_resume',
      resource_type: 'raw',
      use_filename: true,
      unique_filename: false,
      public_id: originalName
    });

    // Remove local temporary file
    fs.unlink(req.file.path, () => {});

    // Save or update the single resume record in the database
    // We'll just delete existing resumes to keep it clean, then insert the new one
    await Resume.deleteMany({});
    const newResume = await Resume.create({
      url: result.secure_url,
      filename: result.public_id,
      originalName: originalName
    });

    res.status(200).json({
      message: 'Resume uploaded successfully!',
      resume: newResume
    });
  } catch (error) {
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, () => {});
    }
    console.error('Resume upload error:', error);
    res.status(500).json({ message: `Resume upload error: ${error.message}` });
  }
};

export const getLatestResume = async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 });
    if (!resume) {
      return res.status(404).json({ message: 'No resume found' });
    }
    res.status(200).json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).json({ message: 'Error retrieving latest resume' });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 });
    if (!resume) {
      return res.status(404).json({ message: 'No resume found' });
    }

    // Delete from Cloudinary
    if (resume.filename) {
      await cloudinary.uploader.destroy(resume.filename, { resource_type: 'raw' });
    }

    // Delete from Database
    await Resume.deleteMany({});
    
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ message: 'Error deleting resume' });
  }
};
