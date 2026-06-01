import fs from 'fs';
import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded or invalid file format' });
    }

    // Check config
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Cloudinary credentials are not configured in .env file.');
      // Clean up the local temp file anyway
      fs.unlink(req.file.path, () => {});
      return res.status(500).json({ message: 'Cloudinary configuration is missing on the server.' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'portfolio_projects'
    });

    // Remove local temporary file to keep disk storage stateless
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Failed to delete temporary local file:', err);
      }
    });

    // Return response with identical structure as previous local uploads
    res.status(200).json({
      message: 'File uploaded successfully to Cloudinary!',
      url: result.secure_url,
      filename: result.public_id
    });
  } catch (error) {
    // If upload fails, try to clean up local file
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlink(req.file.path, () => {});
    }
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ message: `Cloudinary upload error: ${error.message}` });
  }
};
