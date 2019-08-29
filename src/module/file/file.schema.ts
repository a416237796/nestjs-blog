import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  size: Number,
  mimetype: String,
  path: String,
  createdAt: Number,
});
