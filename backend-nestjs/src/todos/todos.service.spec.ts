import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

const mockUser = {
  user_id: 'user123',
  username: 'testuser',
  password: 'hashedpassword',
  todos: [],
};

const mockTodo = {
  todo_id: 'uuid',
  name: 'Test Todo',
  description: 'Test Description',
  isComplete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  endedAt: null,
  user: mockUser,
};

describe('TodosService', () => {
  let service: TodosService;
  let repo: Repository<Todo>;

  const mockRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockResolvedValue(mockTodo),
    findAndCount: jest.fn().mockResolvedValue([[mockTodo], 1]),
    findOne: jest.fn(),
    remove: jest.fn().mockResolvedValue(mockTodo),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    repo = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo for the user', async () => {
      const dto: CreateTodoDto = {
        name: 'Test',
        description: 'Something',
      };
      const result = await service.create(dto, 'user123');
      expect(repo.create).toHaveBeenCalledWith({
        ...dto,
        user: { user_id: 'user123' },
      });
      expect(result).toEqual(mockTodo);
    });
  });

  describe('findAll', () => {
    it('should return todos and pagination info', async () => {
      const query: PaginationQueryDto = { limit: 1, offset: 0 };
      const result = await service.findAll(query, 'user123');
      expect(result).toEqual({
        data: [mockTodo],
        totalCount: 1,
        totalPages: 1,
      });
    });
  });

  describe('findOne', () => {
    it('should return a todo if found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(mockTodo);
      const result = await service.findOne('uuid', 'user123');
      expect(result).toEqual(mockTodo);
    });

    it('should throw NotFoundException if todo not found', async () => {
      mockRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.findOne('uuid', 'user123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update and return the todo', async () => {
      const dto: UpdateTodoDto = { name: 'Updated' };
      jest.spyOn(service, 'findOne').mockResolvedValueOnce({ ...mockTodo });
      const result = await service.update('uuid', dto, 'user123');
      expect(result).toEqual(mockTodo);
    });
  });

  describe('remove', () => {
    it('should remove and return the todo', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockTodo);
      const result = await service.remove('uuid', 'user123');
      expect(result).toEqual(mockTodo);
    });
  });
});
