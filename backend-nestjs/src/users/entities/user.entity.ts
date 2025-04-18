import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm";
import {Todo} from "../../todos/entities/todo.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    username: string;

    @Column({ type: 'text' })
    password: string;

    @OneToMany(() => Todo, (todo) => todo.user)
    todos: Todo[];
}
