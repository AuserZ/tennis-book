import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PaymentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    paymentUrl: string;
}

export function PaymentModal({ open, onOpenChange, paymentUrl }: PaymentModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl w-full h-[80vh] bg-white flex flex-col">
                <iframe
                    src={paymentUrl}
                    title="DOKU Payment"
                    className="w-full h-full border-0 rounded"
                    allowFullScreen
                />
            </DialogContent>
        </Dialog>
    );
} 