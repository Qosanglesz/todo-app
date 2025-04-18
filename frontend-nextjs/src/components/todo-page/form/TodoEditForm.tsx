"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
    name: z.string().min(1, { message: "Todo name must be at least 1 character." }).max(50),
    description: z.string().max(100),
    dueDate: z.date({ required_error: "Due date is required." }),
    isComplete: z.boolean(),
})

type TodoEditFormProps = {
    initialValues: z.infer<typeof formSchema> & { id: string }
    onUpdated?: () => void
}

export function TodoEditForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // name: initialValues.name,
            // description: initialValues.description,
            // dueDate: new Date(initialValues.dueDate),
            // isComplete: initialValues.isComplete,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // try {
        //     const result = await UpdateTodoRequest({ ...values, id: initialValues.id })
        //
        //     if (!result.success) {
        //         toast.error(result.message)
        //         return
        //     }
        //
        //     toast.success("Todo has been updated")
        //     onUpdated?.()
        // } catch {
        //     toast.error("Something went wrong.")
        // }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter todo name" {...field} />
                            </FormControl>
                            <FormDescription>The name of your todo (1-50 characters).</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter todo description" className="resize-none" {...field} />
                            </FormControl>
                            <FormDescription>Describe your todo (1-100 characters).</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Due Date & Time</FormLabel>
                            <FormControl>
                                <Input
                                    type="datetime-local"
                                    {...field}
                                    value={field.value ? format(field.value, "yyyy-MM-dd'T'HH:mm") : ""}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        const date = value ? new Date(value) : undefined
                                        field.onChange(date)
                                    }}
                                />
                            </FormControl>
                            <FormDescription>The due date and time for your todo.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="isComplete"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(checked) => field.onChange(!!checked)}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Mark as complete</FormLabel>
                                <FormDescription>
                                    Check this if the task is already done.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Update Todo
                </Button>
            </form>
        </Form>
    )
}
