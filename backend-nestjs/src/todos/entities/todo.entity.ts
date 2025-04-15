import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({ name: "todos" })
export class Todo {
    @PrimaryGeneratedColumn("uuid")
    todo_id: string;

    @Column("varchar", { length: 50 })
    name: string;

    @Column("varchar", { length: 100 })
    description: string;

    @Column("boolean", { default: false })
    isComplete: boolean;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Column({ type: "timestamp", nullable: true, name: "ended_at" })
    endedAt: Date | null;
}
