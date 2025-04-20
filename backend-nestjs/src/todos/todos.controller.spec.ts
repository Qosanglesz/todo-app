import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

const mockUser = {
    userId: 'user123',
};

const mockTodo = {
    todo_id: 'todo123',
    name: 'Test Todo',
    description: 'Testing...',
    isComplete: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    endedAt: null,
    user: {
        user_id: 'user123',
        username: 'testuser',
        password: 'hashedpassword',
        todos: [],
    },
};

const mockTodosService = {
    create: jest.fn().mockResolvedValue(mockTodo),
    findAll: jest.fn().mockResolvedValue({ data: [mockTodo], totalCount: 1, totalPages: 1 }),
    findOne: jest.fn().mockResolvedValue(mockTodo),
    update: jest.fn().mockResolvedValue({ ...mockTodo, name: 'Updated Todo' }),
    remove: jest.fn().mockResolvedValue(undefined),
};

describe('TodosController', () => {
    let controller: TodosController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TodosController],
            providers: [{ provide: TodosService, useValue: mockTodosService }],
        }).compile();

        controller = module.get<TodosController>(TodosController);
    });

    it('should create a todo', async () => {
        const dto: CreateTodoDto = {
            name: 'Test Todo',
            description: 'Testing...',
        };

        const result = await controller.create(dto, { user: mockUser });
        expect(result).toEqual(mockTodo);
        expect(mockTodosService.create).toHaveBeenCalledWith(dto, mockUser.userId);
    });

    it('should get all todos', async () => {
        const query: PaginationQueryDto = { limit: 10, offset: 0 };

        const result = await controller.findAll(query, { user: mockUser });
        expect(result.data.length).toBe(1);
        expect(mockTodosService.findAll).toHaveBeenCalledWith(query, mockUser.userId);
    });

    it('should get one todo', async () => {
        const result = await controller.findOne('todo123', { user: mockUser });
        expect(result.todo_id).toBe('todo123');
        expect(mockTodosService.findOne).toHaveBeenCalledWith('todo123', mockUser.userId);
    });

    it('should update a todo', async () => {
        const dto: UpdateTodoDto = { name: 'Updated Todo' };

        const result = await controller.update('todo123', dto, { user: mockUser });
        expect(result.name).toBe('Updated Todo');
        expect(mockTodosService.update).toHaveBeenCalledWith('todo123', dto, mockUser.userId);
    });

    it('should delete a todo', async () => {
        await controller.remove('todo123', { user: mockUser });
        expect(mockTodosService.remove).toHaveBeenCalledWith('todo123', mockUser.userId);
    });
});
