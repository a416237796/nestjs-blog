import { Tag } from './../tag/tag.interface';
import { Classify } from './../classify/classify.interface';
export interface Article {
  title: string;
  sbuTitle: string;
  introduction: string;
  content: string;
  author: string;
  copyFrom: string;
  copyFromUrl: string;
  copyAuthor: string;
  reads: number;
  recommends: number;
  top: boolean;
  cover: string;
  classify: Classify[];
  tag: Tag[];
  createdAt: number;
  updatedAt: number;
}
