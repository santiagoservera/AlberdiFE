"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Spinner,
  Input,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { CategoriaModal } from "./Categorias/categoria-modal";
import { SubcategoriaModal } from "./Categorias/subcategoria-modal";
import { ConfirmacionModal } from "./Categorias/confirmacion-modal";
import { useCategorias } from "../../hooks";
import { useSubcategorias } from "../../hooks";
import {
  Search,
  Plus,
  MoreVertical,
  Edit2,
  Trash2,
  ChevronDown,
} from "lucide-react";

export default function SeccionCategorias() {
  // Usar el hook de categorías para obtener los datos de la API
  const {
    categorias,
    loading,
    error,
    fetchCategorias,
    createCategoria,
    updateCategoria,
    deleteCategoria: eliminarCategoria,
  } = useCategorias();

  // Usar el hook de subcategorías
  const {
    createSubcategoria,
    updateSubcategoria,
    deleteSubcategoria: eliminarSubcategoria,
  } = useSubcategorias();

  // Estados para modales de categoría
  const [isCategoriaModalOpen, setIsCategoriaModalOpen] = useState(false);
  const [modalCategoriaMode, setModalCategoriaMode] = useState("crear");
  const [categoriaEditar, setCategoriaEditar] = useState(null);

  // Estados para modales de subcategoría
  const [isSubcategoriaModalOpen, setIsSubcategoriaModalOpen] = useState(false);
  const [modalSubcategoriaMode, setModalSubcategoriaMode] = useState("crear");
  const [subcategoriaEditar, setSubcategoriaEditar] = useState(null);
  const [categoriaPadreActual, setCategoriaPadreActual] = useState(null);

  // Estados para modales de confirmación
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [elementoEliminar, setElementoEliminar] = useState(null);
  const [tipoElementoEliminar, setTipoElementoEliminar] = useState(""); // "categoria" o "subcategoria"

  // Estado para búsqueda
  const [searchQuery, setSearchQuery] = useState("");

  // Estado para categorías expandidas
  const [expandedCategories, setExpandedCategories] = useState({});

  // Cargar categorías al montar el componente
  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  // Filtrar categorías según la búsqueda
  const filteredCategorias = Array.isArray(categorias)
    ? categorias.filter(
        (categoria) =>
          categoria?.nombre
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          false ||
          categoria?.descripcion
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          false ||
          (Array.isArray(categoria?.subcategorias) &&
            categoria.subcategorias.some(
              (sub) =>
                sub?.nombre
                  ?.toLowerCase()
                  .includes(searchQuery.toLowerCase()) || false
            ))
      )
    : [];

  // Funciones para modales de categoría
  const openCreateCategoriaModal = () => {
    setModalCategoriaMode("crear");
    setCategoriaEditar(null);
    setIsCategoriaModalOpen(true);
  };

  const openEditCategoriaModal = (categoria) => {
    setModalCategoriaMode("editar");
    setCategoriaEditar(categoria);
    setIsCategoriaModalOpen(true);
  };

  const closeCategoriaModal = () => {
    setIsCategoriaModalOpen(false);
  };

  // Funciones para modales de subcategoría
  const openCreateSubcategoriaModal = (categoriaPadre) => {
    setModalSubcategoriaMode("crear");
    setSubcategoriaEditar(null);
    setCategoriaPadreActual(categoriaPadre);
    setIsSubcategoriaModalOpen(true);
  };

  const openEditSubcategoriaModal = (categoriaPadre, subcategoria) => {
    setModalSubcategoriaMode("editar");
    setSubcategoriaEditar(subcategoria);
    setCategoriaPadreActual(categoriaPadre);
    setIsSubcategoriaModalOpen(true);
  };

  const closeSubcategoriaModal = () => {
    setIsSubcategoriaModalOpen(false);
  };

  // Funciones para modales de confirmación
  const openConfirmDeleteCategoria = (categoria, e) => {
    if (e && typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }
    setElementoEliminar(categoria);
    setTipoElementoEliminar("categoria");
    setIsConfirmModalOpen(true);
  };

  const openConfirmDeleteSubcategoria = (categoriaPadre, subcategoria, e) => {
    e.stopPropagation();
    setElementoEliminar({ categoriaPadre, subcategoria });
    setTipoElementoEliminar("subcategoria");
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setElementoEliminar(null);
  };

  // Funciones CRUD para categorías
  const saveCategoria = async (categoriaData) => {
    try {
      if (modalCategoriaMode === "crear") {
        // Crear nueva categoría usando el servicio API
        await createCategoria(categoriaData);
      } else {
        // Actualizar categoría existente usando el servicio API
        await updateCategoria(categoriaEditar.id, categoriaData);
      }
      // Recargar categorías después de crear/actualizar
      fetchCategorias();
      closeCategoriaModal();
    } catch (error) {
      console.error("Error al guardar categoría:", error);
      // Aquí podrías mostrar un mensaje de error
    }
  };

  // Funciones CRUD para subcategorías
  const saveSubcategoria = async (subcategoriaData) => {
    if (!categoriaPadreActual) return;

    try {
      // Agregar el ID de la categoría padre a los datos de la subcategoría
      const subcategoriaCompleta = {
        ...subcategoriaData,
        categoria_id: categoriaPadreActual.id,
      };

      if (modalSubcategoriaMode === "crear") {
        // Crear nueva subcategoría
        await createSubcategoria(subcategoriaCompleta);
      } else {
        // Actualizar subcategoría existente
        await updateSubcategoria(subcategoriaEditar.id, subcategoriaCompleta);
      }

      // Recargar categorías después de crear/actualizar subcategoría
      fetchCategorias();
      closeSubcategoriaModal();
    } catch (error) {
      console.error("Error al guardar subcategoría:", error);
      // Aquí podrías mostrar un mensaje de error
    }
  };

  // Función para manejar la eliminación según el tipo
  const handleConfirmDelete = async () => {
    try {
      if (tipoElementoEliminar === "categoria") {
        await eliminarCategoria(elementoEliminar.id);
      } else if (tipoElementoEliminar === "subcategoria") {
        const { subcategoria } = elementoEliminar;
        await eliminarSubcategoria(subcategoria.id);
      }
      // Recargar categorías después de eliminar
      fetchCategorias();
      closeConfirmModal();
    } catch (error) {
      console.error("Error al eliminar:", error);
      // Aquí podrías mostrar un mensaje de error
    }
  };

  // Función para alternar la expansión de una categoría
  const toggleCategoryExpansion = (categoriaId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoriaId]: !prev[categoriaId],
    }));
  };

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado con búsqueda y botón de agregar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-[#4F6B5F] mb-1">
              Categorías
            </h1>
            <p className="text-gray-500 text-sm">
              Gestiona las categorías y subcategorías de productos
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Input
                placeholder="Buscar categorías..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<Search size={18} className="text-gray-400" />}
                classNames={{
                  input: "pl-8",
                }}
                className="w-full"
                size="sm"
              />
            </div>
            <Button
              color="primary"
              className="bg-[#4F6B5F] text-white font-firelli"
              startContent={<Plus size={18} />}
              onClick={openCreateCategoriaModal}
            >
              Nueva categoría
            </Button>
          </div>
        </div>

        {/* Contenido principal */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size="lg" color="#4F6B5F" />
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
            Error al cargar categorías: {error}
          </div>
        ) : filteredCategorias.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4F6B5F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay categorías
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? "No se encontraron categorías que coincidan con tu búsqueda."
                : "Comienza agregando una nueva categoría para organizar tus productos."}
            </p>
            <Button
              color="primary"
              className="bg-[#4F6B5F] text-white font-firelli"
              startContent={<Plus size={18} />}
              onClick={openCreateCategoriaModal}
            >
              Agregar primera categoría
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredCategorias.map((categoria) => (
              <Card
                key={categoria.id}
                className="shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <CardBody className="p-0">
                  {/* Cabecera de la categoría */}
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => toggleCategoryExpansion(categoria.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-[#4F6B5F]/10 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#4F6B5F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {categoria.nombre}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {categoria.descripcion}
                        </p>
                      </div>
                      {categoria.subcategorias &&
                        categoria.subcategorias.length > 0 && (
                          <Chip
                            color="primary"
                            variant="flat"
                            size="sm"
                            className="ml-2"
                          >
                            {categoria.subcategorias.length} subcategorías
                          </Chip>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform ${
                          expandedCategories[categoria.id] ? "rotate-180" : ""
                        }`}
                      />
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical size={18} className="text-gray-500" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Acciones de categoría">
                          <DropdownItem
                            key="edit"
                            startContent={<Edit2 size={16} />}
                            onClick={() => {
                              openEditCategoriaModal(categoria);
                            }}
                          >
                            Editar categoría
                          </DropdownItem>
                          <DropdownItem
                            key="add"
                            startContent={<Plus size={16} />}
                            onClick={() => {
                              openCreateSubcategoriaModal(categoria);
                            }}
                          >
                            Agregar subcategoría
                          </DropdownItem>
                          <DropdownItem
                            key="delete"
                            className="text-danger"
                            color="danger"
                            startContent={<Trash2 size={16} />}
                            onClick={(e) => {
                              openConfirmDeleteCategoria(categoria, e);
                            }}
                          >
                            Eliminar categoría
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>

                  {/* Subcategorías (expandibles) */}
                  {expandedCategories[categoria.id] &&
                    categoria.subcategorias &&
                    categoria.subcategorias.length > 0 && (
                      <>
                        <Divider />
                        <div className="p-4 bg-gray-50">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-sm font-medium text-gray-700">
                              Subcategorías
                            </h4>
                            <Button
                              size="sm"
                              variant="flat"
                              color="primary"
                              startContent={<Plus size={14} />}
                              onClick={() =>
                                openCreateSubcategoriaModal(categoria)
                              }
                              className="h-8"
                            >
                              Agregar
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {categoria.subcategorias.map((subcategoria) => (
                              <div
                                key={subcategoria.id}
                                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-[#4F6B5F]"></div>
                                  <span className="text-sm">
                                    {subcategoria.nombre}
                                  </span>
                                </div>
                                <div className="flex gap-1">
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    onClick={() =>
                                      openEditSubcategoriaModal(
                                        categoria,
                                        subcategoria
                                      )
                                    }
                                  >
                                    <Edit2
                                      size={14}
                                      className="text-gray-500"
                                    />
                                  </Button>
                                  <Button
                                    isIconOnly
                                    size="sm"
                                    variant="light"
                                    className="text-danger"
                                    onClick={(e) =>
                                      openConfirmDeleteSubcategoria(
                                        categoria,
                                        subcategoria,
                                        e
                                      )
                                    }
                                  >
                                    <Trash2
                                      size={14}
                                      className="text-red-500"
                                    />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modales */}
      <CategoriaModal
        isOpen={isCategoriaModalOpen}
        onClose={closeCategoriaModal}
        onSave={saveCategoria}
        modo={modalCategoriaMode}
        categoriaEditar={categoriaEditar}
      />

      <SubcategoriaModal
        isOpen={isSubcategoriaModalOpen}
        onClose={closeSubcategoriaModal}
        onSave={saveSubcategoria}
        modo={modalSubcategoriaMode}
        subcategoriaEditar={subcategoriaEditar}
        categoriaPadre={categoriaPadreActual}
      />

      <ConfirmacionModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirmDelete}
        titulo={`Eliminar ${
          tipoElementoEliminar === "categoria" ? "categoría" : "subcategoría"
        }`}
        mensaje={
          tipoElementoEliminar === "categoria"
            ? `¿Está seguro que desea eliminar la categoría "${
                elementoEliminar?.nombre || ""
              }"? Esta acción eliminará también todas sus subcategorías.`
            : `¿Está seguro que desea eliminar la subcategoría "${
                elementoEliminar?.subcategoria?.nombre || ""
              }"?`
        }
      />
    </section>
  );
}
