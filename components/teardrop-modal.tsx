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
  minimumSpendPerSeat?: number;
  reservationFee?: number;
};

const TeardropModal = ({
  open,
  onOpenChange,
  teardropNumber,
  onBlueOut,
  isSelected,
  minimumSpendPerSeat = 0,
  reservationFee = 0,
}: TeardropModalProps) => {
  const handleBlueOut = () => {
    onBlueOut();
    onOpenChange(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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

        {(minimumSpendPerSeat > 0 || reservationFee > 0) && (
          <div className="mt-4 space-y-2 text-sm">
            {minimumSpendPerSeat > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-white/70">Minimum spend per seat:</span>
                <span className="font-semibold text-white">
                  {formatCurrency(minimumSpendPerSeat)}
                </span>
              </div>
            )}
            {reservationFee > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-white/70">Reservation fee:</span>
                <span className="font-semibold text-white">
                  {formatCurrency(reservationFee)}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={handleBlueOut}
            disabled={isSelected}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              isSelected
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            }`}
          >
            reserve your table
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeardropModal;
