"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from "@nextui-org/react";
import { AlertTriangle } from "lucide-react";

export const ConfirmacionModal = ({
  isOpen,
  onClose,
  onConfirm,
  titulo,
  mensaje,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      classNames={{
        backdrop: "bg-[#000000]/50 backdrop-blur-sm",
        base: "bg-white rounded-lg shadow-lg",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-danger">
                <AlertTriangle size={20} className="text-danger" />
                <h3 className="text-xl font-semibold text-danger">{titulo}</h3>
              </div>
            </ModalHeader>
            <Divider />
            <ModalBody className="py-6">
              <p className="text-gray-700">{mensaje}</p>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <Button variant="flat" onPress={onClose} className="font-medium">
                Cancelar
              </Button>
              <Button
                color="danger"
                onPress={() => {
                  onConfirm();
                  onClose();
                }}
                className="font-medium"
              >
                Eliminar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
