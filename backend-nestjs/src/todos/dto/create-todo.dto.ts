import { IsString, IsOptional, IsDateString, Length } from 'class-validator';

export class CreateTodoDto {
    @IsString()
    @Length(1, 50)
    name: string;

    @IsString()
    @Length(1, 100)
    description: string;

    @IsOptional()
    @IsDateString()
    endedAt?: Date;
}
