import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import Working from "./working";
import { useChest } from "../state-mgr/app-chest";

type ModalProps = {
  children?: React.ReactNode;
  action?: ({ variables }: any) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
};

const Modal = ({ children, isOpen, onClose, action, loading }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const {
    data: { store },
  } = useChest();

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

  const yesText = "ok";
  return (
    <dialog
      ref={modalRef}
      className="p-4 rounded-xl shadow-xl backdrop:bg-gray-800 backdrop:bg-opacity-45"
      onKeyDown={handleKeyDown}
    >
      <div className="text-xl text-center">{children}</div>
      {store.name && (
        <>
          <span className="text-lg font-semibold">{store.name}</span> will be
          deleted
        </>
      )}
      <div className="text-center">
        <button
          onClick={async () => {
            if (typeof action === "function") {
              try {
                await action({
                  id: store.id,
                });
                handleCloseModal();
              } catch (error) {
                handleCloseModal();
              }
            }
          }}
          className="border rounded-full px-6 py-0 mt-1 text-xl outline-1 hover:bg-blue-300 flex"
        >
          <div>{yesText}</div>
          <Working loading={loading} />
        </button>
        <button
          className="absolute text-xs top-1 right-1"
          onClick={handleCloseModal}
        >
          <X size={20} />
        </button>
      </div>
    </dialog>
  );
};

export default Modal;
