"use client";
import { Input, Select, SelectItem } from "@nextui-org/react";

// Estados de pedido actualizados para la API real
export const estadosPedidoFiltro = [
  { key: "", value: "Todos los estados" },
  { key: "pendiente", value: "Pendiente" },
  { key: "confirmado", value: "Confirmado" },
  { key: "enviado", value: "Enviado" },
  { key: "entregado", value: "Entregado" },
  { key: "cancelado", value: "Cancelado" },
];

// Tipos de pedido basados en service_id
export const tiposPedidoFiltro = [
  { key: "", value: "Todos los tipos" },
  { key: "Producto", value: "Productos" },
  { key: "Servicio", value: "Servicios" },
];

export const PedidosFiltros = ({
  filtros,
  soloFinalizados,
  handleChange,
  setSoloFinalizados,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Input
        type="text"
        name="nombre"
        label="Buscar por nombre"
        placeholder="Nombre del cliente"
        value={filtros.nombre}
        onChange={handleChange}
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
        className="w-full"
      >
        {tiposPedidoFiltro.map((tipo) => (
          <SelectItem key={tipo.key} value={tipo.key}>
            {tipo.value}
          </SelectItem>
        ))}
      </Select>
      <Input
        type="date"
        name="fecha"
        label="Fecha"
        value={filtros.fecha}
        onChange={handleChange}
        className="w-full"
      />
      <div className="flex items-center ml-2 mt-2">
        <input
          type="checkbox"
          id="soloFinalizados"
          checked={soloFinalizados}
          onChange={() => setSoloFinalizados(!soloFinalizados)}
          className="mr-2"
        />
        <label htmlFor="soloFinalizados">Solo finalizados</label>
      </div>
    </div>
  );
};
