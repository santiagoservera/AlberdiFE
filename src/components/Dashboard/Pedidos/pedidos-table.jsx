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
import { columns, rowsPerPageOptions, statusColorMap } from "./pedidos-data";
import { DeleteIcon, EditIcon, EyeIcon } from "./pedidos-icons";

export const PedidosTable = ({
  items,
  pedidosFiltrados,
  currentPage,
  rowsPerPage,
  setCurrentPage,
  setRowsPerPage,
  openViewModal,
  openEditModal,
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
          return <div className="capitalize">{pedido.tipo}</div>;
        case "estado":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[pedido.estado]}
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
          return <div>{pedido.telefono}</div>;
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
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [openViewModal, openEditModal]
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
                {pedidosFiltrados.length} pedidos
              </span>
              <Select
                size="sm"
                label="Filas"
                className="w-20"
                value={rowsPerPage.toString()}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
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
        table: "min-w-[800px]", // Asegura un ancho mínimo para permitir scroll horizontal
        base: "overflow-x-auto", // Habilita scroll horizontal cuando sea necesario
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "acciones" ? "center" : "start"}
            className={
              // Ocultar columnas menos importantes en pantallas pequeñas
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
      <TableBody items={items} emptyContent={"No se encontraron pedidos."}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell
                className={
                  // Aplicar las mismas reglas de visibilidad a las celdas
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
