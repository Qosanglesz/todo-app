import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    HttpCode,
    Query,
    UseGuards, Req
} from '@nestjs/common';
import {TodosService} from './todos.service';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';
import {Todo} from "./entities/todo.entity";
import {PaginationQueryDto} from "./dto/pagination-query.dto";
import {AuthGuard} from "@nestjs/passport";

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {
    }

    @Post()
    @HttpCode(201)
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Body() createTodoDto: CreateTodoDto,
        @Req() req: {
            user: {
                userId: string
            }
        }
    ): Promise<Todo> {
        return this.todosService.create(createTodoDto, req.user.userId);
    }

    @Get()
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    async findAll(
        @Query() paginationQuery: PaginationQueryDto,
        @Req() req: {
            user: {
                userId: string
            }
        }
        ): Promise<{
        data: Todo[],
        totalCount: number,
        totalPages: number
    }> {
        return this.todosService.findAll(paginationQuery, req.user.userId);
    }

    @Get(':id')
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    async findOne(
        @Param('id', ParseUUIDPipe) id: string,
        @Req() req: {
            user: {
                userId: string
            }
        }
    ): Promise<Todo> {
        return this.todosService.findOne(id, req.user.userId);
    }

    @Patch(':id')
    @HttpCode(200)
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateTodoDto: UpdateTodoDto,
        @Req() req: {
            user: {
                userId: string
            }
        }
    ): Promise<Todo> {
        return this.todosService.update(id, updateTodoDto, req.user.userId);
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(AuthGuard('jwt'))
    async remove(
        @Param('id', ParseUUIDPipe) id: string,
        @Req() req: {
            user: {
                userId: string
            }
        }
        ): Promise<void> {
        await this.todosService.remove(id, req.user.userId);
    }
}
