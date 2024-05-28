"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenAccount } from "../hooks/use-open-account";
import { useGetAccountByid } from "../api/use-get-account-by-id";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/use-edit-account";
import { useDeleteAccount } from "../api/use-delete-account";

const formSchema = insertAccountSchema.pick({ name: true });
type FormValues = z.infer<typeof formSchema>;

export const EditAccountSheet = () => {
  const { id, isOpen, onClose } = useOpenAccount();
  const accountQuery = useGetAccountByid(id);
  const isLoading = accountQuery.isLoading;
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);
  const isPending = editMutation.isPending || deleteMutation.isPending;
  const defaultValues = accountQuery.data
    ? { name: accountQuery.data.name }
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
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Edit an existing account.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <AccountForm
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
