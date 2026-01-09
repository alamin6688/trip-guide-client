"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ITourist } from "@/types/tourist.interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/formatters";
import InfoRow from "@/components/shared/InoRow";

interface ITouristViewDetailDialogProps {
  open: boolean;
  onClose: () => void;
  tourist: ITourist | null;
}

const TouristViewDetailDialog = ({
  open,
  onClose,
  tourist,
}: ITouristViewDetailDialogProps) => {
  if (!tourist) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Tourist Profile</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-blue-50 rounded-lg mb-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
              <AvatarImage
                src={tourist.profilePhoto || ""}
                alt={tourist.name}
              />
              <AvatarFallback>{getInitials(tourist.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-1">{tourist.name}</h2>
              <p className="text-muted-foreground">{tourist.email}</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
              <InfoRow label="Name" value={tourist.name || "N/A"} />
              <InfoRow
                label="Contact Number"
                value={tourist.contactNumber || "N/A"}
              />
              <InfoRow label="Country" value={tourist.country || "N/A"} />
              <InfoRow label="Address" value={tourist.address || "N/A"} />
              <InfoRow
                label="Gender"
                value={
                  tourist.gender
                    ? tourist.gender.charAt(0) +
                      tourist.gender.slice(1).toLowerCase()
                    : "N/A"
                }
              />
              <InfoRow
                label="Languages"
                value={
                  tourist.languages && tourist.languages.length > 0
                    ? tourist.languages.join(", ")
                    : "N/A"
                }
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TouristViewDetailDialog;
