"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createCategory } from "@/services/admin/guidesManagement";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface CategoryFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CategoryFormDialog = ({
  open,
  onClose,
  onSuccess,
}: CategoryFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(createCategory, null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      formRef.current?.reset();
      onSuccess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onClose, onSuccess]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>

        <form ref={formRef} action={formAction} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              name="title"
              placeholder="Adventure"
              defaultValue={state?.formData?.title || ""}
            />
            <InputFieldError field="title" state={state} />
          </Field>

          <Field>
            <FieldLabel htmlFor="icon">Icon (Emoji)</FieldLabel>
            <Input
              id="icon"
              name="icon"
              placeholder="🏔️"
              defaultValue={state?.formData?.icon || ""}
            />
            <InputFieldError field="icon" state={state} />
          </Field>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Save Category"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryFormDialog;
