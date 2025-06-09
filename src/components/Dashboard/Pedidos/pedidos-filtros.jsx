"use client";

import { Input, Select, SelectItem, Checkbox } from "@heroui/react";

// Estados de pedido actualizados para la API real
export const estadosPedidoFiltro = [
  { key: "", value: "Todos los estados" },
  { key: "pendiente", value: "Pendiente" },
  { key: "rechazado", value: "Rechazado" },
  { key: "aceptado", value: "Aceptado" },
];

// Tipos de pedido basados en service_id
export const tiposPedidoFiltro = [
  { key: "", value: "Todos los tipos" },
  { key: "Producto", value: "Productos" },
  { key: "Servicio", value: "Servicios" },
];

// Función para obtener estados por defecto (sin rechazados)
export const getDefaultEstadoFilter = () => {
  return ["pendiente", "aceptado"];
};

// Estados que se muestran por defecto
export const estadosVisiblesPorDefecto = ["pendiente", "aceptado"];

export const PedidosFiltros = ({
  filtros,
  soloAceptados,
  handleChange,
  setSoloAceptados,
  incluirRechazadas = false,
  setIncluirRechazadas,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <Input
        type="text"
        name="nombre"
        label="Buscar por nombre"
        placeholder="Nombre del cliente"
        value={filtros.nombre}
        onChange={handleChange}
        variant="bordered"
        className="w-full"
      />
      <Select
        name="estado"
        label="Estado"
        placeholder="Todos los estados"
        selectedKeys={filtros.estado ? [filtros.estado] : []}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0] || "";
          handleChange({ target: { name: "estado", value } });
        }}
        variant="bordered"
        className="w-full"
      >
        {estadosPedidoFiltro.map((estado) => (
          <SelectItem key={estado.key} value={estado.key}>
            {estado.value}
          </SelectItem>
        ))}
      </Select>
      <Select
        name="tipo"
        label="Tipo"
        placeholder="Todos los tipos"
        selectedKeys={filtros.tipo ? [filtros.tipo] : []}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0] || "";
          handleChange({ target: { name: "tipo", value } });
        }}
        variant="bordered"
        className="w-full"
      >
        {tiposPedidoFiltro.map((tipo) => (
          <SelectItem key={tipo.key} value={tipo.key}>
            {tipo.value}
          </SelectItem>
        ))}
      </Select>

      <div className="flex items-center">
        <Checkbox
          isSelected={soloAceptados}
          onValueChange={setSoloAceptados}
          color="success"
        >
          Solo aceptados
        </Checkbox>
      </div>

      <div className="flex items-center">
        <Checkbox
          isSelected={incluirRechazadas}
          onValueChange={setIncluirRechazadas}
          color="danger"
        >
          Incluir rechazadas
        </Checkbox>
      </div>
    </div>
  );
};
