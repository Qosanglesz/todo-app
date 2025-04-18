import { IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    offset?: number;

    @IsOptional()
    @IsString()
    search?: string; // 👈 Add this
}