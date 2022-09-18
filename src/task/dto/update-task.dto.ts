import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly status: boolean;
}
