import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { ILike, Repository } from 'typeorm';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: string): Promise<Todo> {
    const todo = this.todoRepository.create({
      ...createTodoDto,
      user: { user_id: userId },
    });

    return this.todoRepository.save(todo);
  }

  async findAll(
    paginationQuery: PaginationQueryDto,
    userId: string,
  ): Promise<{
    data: Todo[];
    totalCount: number;
    totalPages: number;
  }> {
    const { limit = 10, offset = 0, search } = paginationQuery;

    const where: any = { user: { user_id: userId } };

    if (search) {
      where.name = ILike(`%${search}%`);
    }

    const [data, totalCount] = await this.todoRepository.findAndCount({
      where,
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const totalPages = Math.ceil(totalCount / limit);

    return { data, totalCount, totalPages };
  }

  async findOne(id: string, userId: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { todo_id: id, user: { user_id: userId } },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    return todo;
  }

  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
    userId: string,
  ): Promise<Todo> {
    const todo: Todo = await this.findOne(id, userId);
    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  async remove(id: string, userId: string): Promise<Todo> {
    const todo: Todo = await this.findOne(id, userId);
    return this.todoRepository.remove(todo);
  }
}
