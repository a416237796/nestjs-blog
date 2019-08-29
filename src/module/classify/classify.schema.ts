import * as mongoose from 'mongoose';

export const ClassifySchema = new mongoose.Schema({
  name: String,
  pid: String,
  createdAt: Number,
  updatedAt: Number,
});
