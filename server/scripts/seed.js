import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

async function seed() {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';
  
  console.log('Connecting to database for seeding...');
  try {
    await mongoose.connect(mongoURI);
    console.log('Successfully connected to MongoDB.');

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || 'admin123';
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = new User({
        username,
        password: hashedPassword
      });
      await newAdmin.save();
      console.log(`Default admin user successfully seeded: Username = ${username}`);
    } else {
      console.log('Admin user(s) already exist. Seeding skipped.');
    }
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  }
}

seed();
