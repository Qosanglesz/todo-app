'use client'

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {TodosType, TodoUpdateDTO} from "@/types/todosType";
import {Card} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {TodoCreateForm} from "@/components/todo-page/form/TodoCreateForm";
import {TodoEditForm} from "@/components/todo-page/form/TodoEditForm";

interface TodoTableProp {
    todos: TodosType[];
    onDelete: (id:string) => void;
    onEdit: (todoId: string, newData: TodoUpdateDTO) => void;
}

export default function TodoTable({todos, onDelete, onEdit}: TodoTableProp) {
    return (
        <div>
            <Card className="my-5">
                <Table>
                    <TableCaption>A list of your recent todos.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Ended At</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-center">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {todos.map((todo, index) => (
                            <TableRow key={todo.todo_id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{todo.name}</TableCell>
                                <TableCell>{todo.description}</TableCell>
                                <TableCell>{new Date(todo.createdAt).toLocaleString()}</TableCell>
                                <TableCell>{new Date(todo.endedAt).toLocaleString()}</TableCell>
                                <TableCell>{todo.isComplete ? 'Done' : 'Pending'}</TableCell>
                                <TableCell className="text-center">
                                    {/* Dialog to Edit todo*/}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline">Update</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Update Todo</DialogTitle>
                                                <DialogDescription>Fill out the form below to update a todo item.</DialogDescription>
                                            </DialogHeader>
                                            <TodoEditForm initialValues={todo} onEdit={onEdit}/>
                                        </DialogContent>
                                    </Dialog>

                                    <Button
                                        variant="destructive" className="ml-2"
                                        onClick={()=> {onDelete(todo.todo_id)}}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
