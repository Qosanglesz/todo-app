import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateTodoDto} from './dto/create-todo.dto';
import {UpdateTodoDto} from './dto/update-todo.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Todo} from "./entities/todo.entity";
import {Repository} from "typeorm";

@Injectable()
export class TodosService {
    constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>) {
    }

    async create(createTodoDto: CreateTodoDto): Promise<Todo> {
        const todo: Todo = this.todoRepository.create(createTodoDto);
      return this.todoRepository.save(todo)
    }

    async findAll(): Promise<Todo[]> {
        return this.todoRepository.find()
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
