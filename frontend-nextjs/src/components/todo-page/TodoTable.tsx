'use client'

import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {TodosType} from "@/types/todosType";
import {Card} from "@/components/ui/card";

interface TodoTableProp {
    todos: TodosType[]
}

export default function TodoTable({todos}: TodoTableProp) {
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
                                    <Button variant="outline">Update</Button>
                                    <Button variant="destructive" className="ml-2">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
