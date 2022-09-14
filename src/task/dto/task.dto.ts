import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TaskDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly status: boolean;

  @IsString()
  @IsNotEmpty()
  readonly slug: string;
}
