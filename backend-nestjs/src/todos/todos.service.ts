import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Todo} from "./entities/todo.entity";
import {ILike, Repository} from "typeorm";
import {PaginationQueryDto} from "./dto/pagination-query.dto";

@Injectable()
export class TodosService {
    constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>) {
    }

    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        const todo: Todo = this.todoRepository.create(createTodoDto);
      return this.todoRepository.save(todo)
    }

    async findAll(paginationQuery: PaginationQueryDto): Promise<{
        data: Todo[];
        totalCount: number;
        totalPages: number;
    }> {
        const { limit = 10, offset = 0, search } = paginationQuery;

        const where = search
            ? [{ name: ILike(`%${search}%`) }]
            : {};

        const [data, totalCount] = await this.todoRepository.findAndCount({
            where,
            skip: offset,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        const totalPages = Math.ceil(totalCount / limit);

        return { data, totalCount, totalPages };
    }

    async findOne(id: string): Promise<Todo> {
        const todo: Todo | null = await this.todoRepository.findOne({
            where: {
                todo_id: id
            }
        });
        if (!todo) {
            throw new NotFoundException(`Not found todo with id ${id}`);
        }
        return todo
    }

    async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo>{
        const todo: Todo = await this.findOne(id);
        Object.assign(todo, updateTodoDto)
        return this.todoRepository.save(todo)
    }

    async remove(id: string): Promise<Todo> {
      const todo: Todo = await this.findOne(id);
      return this.todoRepository.remove(todo);
    }
}
