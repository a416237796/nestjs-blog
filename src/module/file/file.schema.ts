import * as mongoose from 'mongoose';

export const FileSchema = new mongoose.Schema({
  name: String,
  path: String,
  md5: String,
  size: Number,
  contentType: String,
  createdAt: Number,
});
