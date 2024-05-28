"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertCategorySchema } from "@/db/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertCategorySchema.pick({ name: true });
type FormValues = z.infer<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const CategoryForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete the category"
  );

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      onDelete?.();
    }
  };

  return (
    <Form {...form}>
      <ConfirmDialog />
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="e.g. Food, Travel, Bills..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={disabled}>
          {id ? "Save Changes" : "Create Category"}
        </Button>
        {!!id && (
          <Button
            className="w-full flex items-center gap-2"
            disabled={disabled}
            type="button"
            variant={"outline"}
            onClick={handleDelete}
          >
            <Trash className="size-4" /> Delete Category
          </Button>
        )}
      </form>
    </Form>
  );
};
