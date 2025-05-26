"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "./pedidos-icons";

// Configuración de columnas
export const columns = [
  { name: "CLIENTE", uid: "cliente" },
  { name: "PEDIDO", uid: "pedido" },
  { name: "TIPO", uid: "tipo" },
  { name: "ESTADO", uid: "estado" },
  { name: "FECHA", uid: "fecha" },
  { name: "DIRECCIÓN", uid: "direccion" },
  { name: "TELÉFONO", uid: "telefono" },
  { name: "ACCIONES", uid: "acciones" },
];

// Mapeo de colores para estados
export const statusColorMap = {
  pendiente: "warning",
  confirmado: "primary",
  enviado: "secondary",
  entregado: "success",
  cancelado: "danger",
};

// Opciones de filas por página
export const rowsPerPageOptions = [
  { key: "5", value: "5" },
  { key: "10", value: "10" },
  { key: "15", value: "15" },
  { key: "20", value: "20" },
];

export const PedidosTable = ({
  items,
  pedidosFiltrados,
  currentPage,
  rowsPerPage,
  setCurrentPage,
  setRowsPerPage,
  openViewModal,
  openEditModal,
  handleDeleteOrden,
}) => {
  const pages = Math.ceil(pedidosFiltrados.length / rowsPerPage);

  // Custom cell renderer
  const renderCell = React.useCallback(
    (pedido, columnKey) => {
      const cellValue = pedido[columnKey];

      switch (columnKey) {
        case "cliente":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{`${pedido.nombre} ${pedido.apellido}`}</p>
              <p className="text-sm text-default-400">{pedido.telefono}</p>
              {pedido.email && (
                <p className="text-xs text-default-300">{pedido.email}</p>
              )}
            </div>
          );
        case "pedido":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{pedido.pedido}</p>
              <p className="text-bold text-sm text-default-400">
                {pedido.fechaPedido}
              </p>
            </div>
          );
        case "tipo":
          return (
            <Chip
              className="capitalize"
              color={pedido.tipo === "Servicio" ? "secondary" : "primary"}
              size="sm"
              variant="flat"
            >
              {pedido.tipo}
            </Chip>
          );
        case "estado":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[pedido.estado] || "default"}
              size="sm"
              variant="flat"
            >
              {pedido.estado}
            </Chip>
          );
        case "fecha":
          return <div>{pedido.fecha}</div>;
        case "direccion":
          return <div className="truncate max-w-xs">{pedido.direccion}</div>;
        case "telefono":
          return (
            <Tooltip content="Enviar WhatsApp">
              <a
                href={`https://wa.me/${pedido.telefono}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 cursor-pointer"
              >
                {pedido.telefono}
              </a>
            </Tooltip>
          );
        case "acciones":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Ver detalles">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => openViewModal(pedido)}
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Editar pedido">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => openEditModal(pedido)}
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar pedido">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => handleDeleteOrden(pedido.id)}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [openViewModal, openEditModal, handleDeleteOrden]
  );

  return (
    <Table
      aria-label="Tabla de pedidos"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-default-400">
                Mostrando {Math.min(items.length, rowsPerPage)} de{" "}
                {pedidosFiltrados.length} órdenes
              </span>
              <Select
                size="sm"
                label="Filas"
                className="w-20"
                selectedKeys={[rowsPerPage.toString()]}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys)[0];
                  setRowsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                {rowsPerPageOptions.map((option) => (
                  <SelectItem key={option.key} value={option.key}>
                    {option.value}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Pagination
              isCompact
              showControls
              showShadow
              color="success"
              page={currentPage}
              total={pages}
              onChange={setCurrentPage}
            />
          </div>
        ) : null
      }
      classNames={{
        wrapper: "min-h-[222px]",
        table: "min-w-[800px]",
        base: "overflow-x-auto",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "acciones" ? "center" : "start"}
            className={
              column.uid === "direccion"
                ? "hidden md:table-cell"
                : column.uid === "telefono"
                ? "hidden sm:table-cell"
                : column.uid === "fecha"
                ? "hidden sm:table-cell"
                : ""
            }
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items} emptyContent={"No se encontraron órdenes."}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell
                className={
                  columnKey === "direccion"
                    ? "hidden md:table-cell"
                    : columnKey === "telefono"
                    ? "hidden sm:table-cell"
                    : columnKey === "fecha"
                    ? "hidden sm:table-cell"
                    : ""
                }
              >
                {renderCell(item, columnKey.toString())}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
