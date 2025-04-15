import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {TodoCreateForm} from "@/components/todo-page/form/TodoCreateForm";

export default function CreateTodoDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Todo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create New Todo</DialogTitle>
                    <DialogDescription>Fill out the form below to create a new todo item.</DialogDescription>
                </DialogHeader>
                <TodoCreateForm onSubmit={()=> {
                    return null;
                }}/>
            </DialogContent>
        </Dialog>
    )
}
