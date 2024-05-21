import { X } from "lucide-react";
import { useEffect, useRef } from "react";

type ModalProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className: string;
};

const FormModal = ({ children, isOpen, onClose, className }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isOpen) {
        !modalElement.open && modalElement.showModal();
      } else {
        modalElement.open && modalElement.close();
      }
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  return (
    <dialog ref={modalRef} className={className} onKeyDown={handleKeyDown}>
      <div className="text-xl text-center h-full">{children}</div>
      <button
        className="absolute text-xs top-1 right-1"
        onClick={handleCloseModal}
      >
        <X size={20} />
      </button>
    </dialog>
  );
};

export default FormModal;
