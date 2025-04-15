import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import {
    IsBoolean,
    IsDateString,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @IsOptional()
    @IsString()
    @Length(1, 50)
    name?: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    description?: string;

    @IsOptional()
    @IsBoolean()
    isComplete?: boolean;

    @IsOptional()
    @IsDateString()
    @Type(() => Date)
    endedAt?: Date;
}
