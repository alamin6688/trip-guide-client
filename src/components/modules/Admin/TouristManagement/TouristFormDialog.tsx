"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ITourist } from "@/types/tourist.interface";
import { updateTourist } from "@/services/admin/touristsManagement";
import { toast } from "sonner";
import { file } from "zod";

interface TouristFormDialogProps {
  open: boolean;
  onClose: () => void;
  tourist: ITourist | null;
  onSuccess: () => void;
}

const TouristFormDialog = ({ open, onClose, tourist, onSuccess }: TouristFormDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!tourist) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!tourist.id) return;

    const formData = new FormData(e.currentTarget);
    setIsSubmitting(true);

    const result = await updateTourist(tourist.id, formData);

    setIsSubmitting(false);

    if (result.success) {
      toast.success("Tourist updated successfully!");
      onSuccess();
      onClose();
    } else {
      toast.error(result.message || "Failed to update tourist");
      console.log(result.errors || result.formData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-[500px] max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Tourist</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div className="flex flex-col gap-2">
            <label>Name</label>
            <input
              name="name"
              defaultValue={tourist.name}
              required
              className="input p-2 border rounded-2xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              name="email"
              type="email"
              defaultValue={tourist.email}
              required
              className="input p-2 border rounded-2xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Contact Number</label>
            <input
              name="contactNumber"
              defaultValue={tourist.contactNumber}
              className="input p-2 border rounded-2xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Address</label>
            <input
              name="address"
              defaultValue={tourist.address || ""}
              className="input p-2 border rounded-2xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Country</label>
            <input
              name="country"
              defaultValue={tourist.country || ""}
              className="input p-2 border rounded-2xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Languages (comma separated)</label>
            <input
              name="languages"
              defaultValue={tourist.languages.join(", ")}
              className="input p-2 border rounded-2xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Travel Preferences</label>
            <textarea
              name="travelPreferences"
              defaultValue={tourist.travelPreferences || ""}
              className="input p-2 border rounded-2xl"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TouristFormDialog;
