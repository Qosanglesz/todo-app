'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { TodosType, TodoUpdateDTO } from '@/types/todosType';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { TodoEditForm } from '@/components/todo-page/form/TodoEditForm';
import { Settings, Trash2 } from 'lucide-react';

interface TodoTableProp {
  todos: TodosType[];
  onDelete: (id: string) => void;
  onEdit: (todoId: string, newData: TodoUpdateDTO) => void;
  currentPage: number;
}

export default function TodoTable({ todos, onDelete, onEdit, currentPage }: TodoTableProp) {
  const calculateIndex = (index: number) => {
    if (currentPage === 1) return index + 1;
    return (currentPage - 1) * 10 + index + 1;
  };

  const blankRows = 10 - todos?.length;

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
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todos?.map((todo, index) => (
                  <TableRow key={todo.todo_id} className="h-8">
                    <TableCell>{calculateIndex(index)}</TableCell>
                    <TableCell>{todo.name}</TableCell>
                    <TableCell>{todo.description}</TableCell>
                    <TableCell>{new Date(todo.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{new Date(todo.endedAt).toLocaleString()}</TableCell>
                    <TableCell>
                      {todo.isComplete ? (
                          <Badge>Complete</Badge>
                      ) : (
                          <Badge variant="secondary">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-center flex justify-center gap-2">
                      {/* Edit Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Settings />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Update Todo</DialogTitle>
                            <DialogDescription>
                              Fill out the form below to update a todo item.
                            </DialogDescription>
                          </DialogHeader>
                          <TodoEditForm initialValues={todo} onEdit={onEdit} />
                        </DialogContent>
                      </Dialog>

                      {/* Delete Alert Dialog */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="default" size="icon">
                            <Trash2 />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the todo "{todo.name}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => onDelete(todo.todo_id)}
                            >
                              Yes, Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
              ))}

              {/* Blank Rows */}
              {blankRows > 0 &&
                  new Array(blankRows).fill(0).map((_, index) => (
                      <TableRow key={`blank-${index}`} className="h-13">
                        <TableCell colSpan={7} />
                      </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Card>
      </div>
  );
}
