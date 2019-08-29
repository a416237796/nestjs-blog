import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateClassifyDto {
  @IsNotEmpty({ message: '分类名不能为空！' })
  @IsString({ message: '分类名格式不对！' })
  @MaxLength(50, { message: '分类名太长！' })
  readonly name: string;
  readonly updatedAt: number;
}
