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
            <ModalHeader className="flex flex-col gap-1">{titulo}</ModalHeader>
            <ModalBody>
              <p>{mensaje}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="danger"
                onPress={() => {
                  onConfirm();
                  onClose();
                }}
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
