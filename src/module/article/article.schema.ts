import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  title: String,
  sbuTitle: String,
  introduction: String,
  content: String,
  author: String,
  copyFrom: String,
  copyFromUrl: String,
  copyAuthor: String,
  reads: Number,
  recommends: Number,
  top: Boolean,
  cover: String,
  classify: Array,
  tag: Array,
  createdAt: Number,
  updatedAt: Number,
});
