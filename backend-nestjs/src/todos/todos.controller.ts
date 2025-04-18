import {Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, HttpCode, Query} from '@nestjs/common';
import {TodosService} from './todos.service';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';
import {Todo} from "./entities/todo.entity";
import {PaginationQueryDto} from "./dto/pagination-query.dto";

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {
    }

    @Post()
    @HttpCode(201)
    async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
        return this.todosService.create(createTodoDto);
    }

    @Get()
    @HttpCode(200)
    async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<{
        data: Todo[],
        totalCount: number,
        totalPages: number
    }> {
        return this.todosService.findAll(paginationQuery);
    }

    @Get(':id')
    @HttpCode(200)
    async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Todo> {
        return this.todosService.findOne(id);
    }

    @Patch(':id')
    @HttpCode(200)
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<Todo> {
        return this.todosService.update(id, updateTodoDto);
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
        await this.todosService.remove(id);
    }
}
