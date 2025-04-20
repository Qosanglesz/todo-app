import { DataSource } from 'typeorm';
import {config} from "dotenv";
import {ConfigService} from "@nestjs/config";
import {Todo} from "./src/todos/entities/todo.entity";
import {User} from "./src/users/entities/user.entity";
config();

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.getOrThrow('POSTGRES_HOST'),
    port: configService.getOrThrow('POSTGRES_PORT'),
    database: configService.getOrThrow('POSTGRES_DB'),
    username: configService.getOrThrow('POSTGRES_USER'),
    password: configService.getOrThrow('POSTGRES_PASSWORD'),
    migrations: ['migrations/**'],
    entities: [Todo, User]
});