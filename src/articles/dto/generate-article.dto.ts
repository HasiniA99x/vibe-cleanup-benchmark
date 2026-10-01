import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class GenerateArticleDto {
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  title!: string;

  @IsString()
  @MinLength(20)
  content!: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
