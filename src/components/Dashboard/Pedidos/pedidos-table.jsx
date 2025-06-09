"use client";

import React, { useState } from "react";
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
  Card,
  CardBody,
  Button,
} from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "./pedidos-icons";
import {
  Package,
  Phone,
  MapPin,
  Calendar,
  User,
  FileText,
  Tag,
} from "lucide-react";

// Configuración de columnas
export const columns = [
  { name: "CLIENTE", uid: "cliente", icon: <User className="w-4 h-4" /> },
  { name: "PEDIDO", uid: "pedido", icon: <FileText className="w-4 h-4" /> },
  { name: "TIPO", uid: "tipo", icon: <Tag className="w-4 h-4" /> },
  { name: "ESTADO", uid: "estado", icon: <Package className="w-4 h-4" /> },
  { name: "FECHA", uid: "fecha", icon: <Calendar className="w-4 h-4" /> },
  { name: "DIRECCIÓN", uid: "direccion", icon: <MapPin className="w-4 h-4" /> },
  { name: "TELÉFONO", uid: "telefono", icon: <Phone className="w-4 h-4" /> },
  { name: "ACCIONES", uid: "acciones" },
];

// Mapeo de colores para estados
export const statusColorMap = {
  pendiente: "warning", // amarillo
  rechazado: "danger", // rojo
  aceptado: "success", // verde
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
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (id) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

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
            </div>
          );
        default:
          return cellValue;
      }
    },
    [openViewModal, openEditModal, handleDeleteOrden]
  );

  // Renderizado de tarjetas para móvil
  const renderMobileCards = () => {
    return items.map((pedido) => (
      <Card key={pedido.id} className="mb-4 shadow-sm">
        <CardBody className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-semibold text-lg">{`${pedido.nombre} ${pedido.apellido}`}</h4>
              <p className="text-sm text-gray-600">{pedido.pedido}</p>
            </div>
            <Chip
              className="capitalize"
              color={statusColorMap[pedido.estado]}
              size="sm"
              variant="flat"
            >
              {pedido.estado}
            </Chip>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{pedido.tipo}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{pedido.fecha}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <a
                href={`https://wa.me/${pedido.telefono}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-600"
              >
                {pedido.telefono}
              </a>
            </div>
          </div>

          {expandedRows.has(pedido.id) && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                <span className="text-sm">
                  {pedido.direccion || "No especificada"}
                </span>
              </div>
              {pedido.email && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{pedido.email}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
            <Button
              size="sm"
              variant="light"
              onPress={() => toggleRowExpansion(pedido.id)}
              className="text-xs"
            >
              {expandedRows.has(pedido.id) ? "Ver menos" : "Ver más"}
            </Button>
            <div className="flex gap-1">
              <Button
                size="sm"
                isIconOnly
                variant="light"
                onPress={() => openViewModal(pedido)}
                className="text-default-400"
              >
                <EyeIcon />
              </Button>
              <Button
                size="sm"
                isIconOnly
                variant="light"
                onPress={() => openEditModal(pedido)}
                className="text-default-400"
              >
                <EditIcon />
              </Button>
              <Button
                size="sm"
                isIconOnly
                variant="light"
                color="danger"
                onPress={() => handleDeleteOrden(pedido.id)}
              >
                <DeleteIcon />
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    ));
  };

  return (
    <div>
      {/* Vista móvil (tarjetas) */}
      <div className="md:hidden">
        {renderMobileCards()}
        {pages > 0 && (
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex justify-between items-center">
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
            <div className="flex justify-center">
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
          </div>
        )}
      </div>

      {/* Vista desktop (tabla) */}
      <div className="hidden md:block">
        <Table
          aria-label="Tabla de pedidos"
          bottomContent={
            pages > 0 ? (
              <div className="flex w-full justify-between items-center">
                <div className="flex items-center gap-2">
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
                    ? "hidden lg:table-cell"
                    : column.uid === "telefono"
                    ? "hidden md:table-cell"
                    : column.uid === "fecha"
                    ? "hidden md:table-cell"
                    : ""
                }
              >
                <div className="flex items-center gap-1">
                  {column.icon}
                  <span>{column.name}</span>
                </div>
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
                        ? "hidden lg:table-cell"
                        : columnKey === "telefono"
                        ? "hidden md:table-cell"
                        : columnKey === "fecha"
                        ? "hidden md:table-cell"
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
      </div>
    </div>
  );
};
