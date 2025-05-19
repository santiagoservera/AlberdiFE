"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export const ConfirmacionModal = ({
  isOpen,
  onClose,
  onConfirm,
  titulo,
  mensaje,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-xl font-semibold text-gray-900">{titulo}</h3>
            </ModalHeader>
            <ModalBody>
              <p className="text-gray-600">{mensaje}</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose} className="font-medium">
                Cancelar
              </Button>
              <Button
                color="danger"
                className="font-medium"
                onPress={onConfirm}
              >
                Confirmar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmacionModal;
