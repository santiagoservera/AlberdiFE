"use client";

import React from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { estadosPedidoFiltro, tiposPedidoFiltro } from "./pedidos-data";

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
        value={filtros.estado}
        onChange={(e) =>
          handleChange({ target: { name: "estado", value: e.target.value } })
        }
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
        value={filtros.tipo}
        onChange={(e) =>
          handleChange({ target: { name: "tipo", value: e.target.value } })
        }
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
