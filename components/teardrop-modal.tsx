"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type TeardropModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teardropNumber: number;
  onBlueOut: () => void;
  isSelected: boolean;
};

const TeardropModal = ({
  open,
  onOpenChange,
  teardropNumber,
  onBlueOut,
  isSelected,
}: TeardropModalProps) => {
  const handleBlueOut = () => {
    onBlueOut();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/90 border border-white/20 text-white">
        <DialogTitle className="text-xl font-semibold">
          Chair #{teardropNumber}
        </DialogTitle>
        <DialogDescription className="text-white/70">
          {isSelected
            ? "This chair is already selected."
            : "Click the button below to select this chair."}
        </DialogDescription>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={handleBlueOut}
            disabled={isSelected}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              isSelected
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            }`}
          >
            Blue Out
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeardropModal;
