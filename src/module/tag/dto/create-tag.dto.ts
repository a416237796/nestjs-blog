import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTagDto {
  @IsNotEmpty({message: '标签不能为空！'})
  @IsString({message: '标签格式不正确！'})
  @MaxLength(50, {message: '标签太长！'})
  readonly name: string;
}
