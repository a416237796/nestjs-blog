import { IsNotEmpty, MaxLength } from "class-validator";

export class CreateArticleDto {
  @IsNotEmpty({message: '标题必填！'})
  @MaxLength(255, {message: '标题超出长度限制！'})
  readonly title: string;
  @MaxLength(255, {message: '副标题超出长度限制！'})
  readonly sbuTitle: string;
  readonly introduction: string;
  @IsNotEmpty({message: '内容必填！'})
  readonly content: string;
  readonly author: string;
  readonly copyFrom: string;
  readonly copyFromUrl: string;
  readonly copyAuthor: string;
  readonly top: boolean;
  readonly cover: string;
  readonly classify: string;
  readonly tag: string;
}
