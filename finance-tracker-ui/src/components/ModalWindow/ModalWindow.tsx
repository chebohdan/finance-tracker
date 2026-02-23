import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Button from "../Button/Button";

type ModalWindowProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

function ModalWindow({
  isOpen,
  onClose,
  title,
  children,
}: Readonly<ModalWindowProps>) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm " />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-md bg-dark-surface rounded-lg shadow-2xl border border-dark-surface/80 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-5 border-b border-dark-surface/60">
            <h2 className="text-lg font-semibold text-dark-text leading-tight">
              {title}
            </h2>
            <Button variant="secondary" onClick={onClose}>
              <IoClose size={20} />
            </Button>
          </div>
        )}

        {/* Body */}
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default ModalWindow;
