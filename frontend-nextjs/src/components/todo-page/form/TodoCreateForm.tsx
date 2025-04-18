'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { CreateTodoRequest } from '@/app/todo/actions';

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Todo name must be at least 1 character.',
    })
    .max(50, {
      message: 'Todo name must be at most 50 characters.',
    }),
  description: z.string().max(100, {
    message: 'Todo description must be at most 100 characters.',
  }),
  dueDate: z.date({
    required_error: 'A date is required.',
  }),
});

export function TodoCreateForm({ onCreated }: { onCreated?: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      dueDate: new Date(),
    },
  });

  async function onSubmit(): Promise<void> {
    const data = {
      name: form.getValues('name'),
      description: form.getValues('description'),
      endedAt: form.getValues('dueDate'),
    };

    try {
      const result = await CreateTodoRequest(data);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success('Todo has been created');
      onCreated?.();
    } catch {
      toast.error('Something went wrong.');
    }
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
                  value={field.value ? format(field.value, "yyyy-MM-dd'T'HH:mm") : ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    const date = value ? new Date(value) : undefined;
                    field.onChange(date);
                  }}
                />
              </FormControl>
              <FormDescription>The due date and time for your todo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Create Todo
        </Button>
      </form>
    </Form>
  );
}
