"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useGetCategoryByid } from "../api/use-get-category-by-id";
import { Loader2 } from "lucide-react";
import { useEditCategory } from "../api/use-edit-categories";
import { useDeleteCategory } from "../api/use-delete-category";
import { useOpenCategory } from "../hooks/use-open-category";
import { CategoryForm } from "./category-form";

const formSchema = insertCategorySchema.pick({ name: true });
type FormValues = z.infer<typeof formSchema>;

export const EditCategorySheet = () => {
  const { id, isOpen, onClose } = useOpenCategory();
  const categoryQuery = useGetCategoryByid(id);
  const isLoading = categoryQuery.isLoading;
  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);
  const isPending = editMutation.isPending || deleteMutation.isPending;
  const defaultValues = categoryQuery.data
    ? { name: categoryQuery.data.name }
    : { name: "" };
  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, { onSuccess: () => onClose() });
  };

  const onDelete = () => {
    deleteMutation.mutate({ id }, { onSuccess: () => onClose() });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Category</SheetTitle>
          <SheetDescription>Edit an existing cateegory.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <CategoryForm
            onSubmit={onSubmit}
            disabled={isPending}
            defaultValues={defaultValues}
            id={id}
            onDelete={onDelete}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
