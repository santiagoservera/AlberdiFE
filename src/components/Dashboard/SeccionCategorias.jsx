import { useState } from "react";
import {
  Button,
  Tooltip,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Badge,
} from "@nextui-org/react";
import { categoriasIniciales } from "./Categorias/categoria-data";
import { CategoriaModal } from "./Categorias/categoria-modal";
import { SubcategoriaModal } from "./Categorias/subcategoria-modal";
import { ConfirmacionModal } from "./Categorias/confirmacion-modal";

export default function SeccionCategorias() {
  // Estado para la lista de categorías
  const [categorias, setCategorias] = useState(categoriasIniciales);

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
    e.stopPropagation();
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
  const saveCategoria = (categoriaData) => {
    if (modalCategoriaMode === "crear") {
      // Agregar nueva categoría
      setCategorias([...categorias, categoriaData]);
    } else {
      // Actualizar categoría existente
      setCategorias(
        categorias.map((c) => (c.id === categoriaData.id ? categoriaData : c))
      );
    }
  };

  const deleteCategoria = () => {
    if (elementoEliminar && tipoElementoEliminar === "categoria") {
      setCategorias(categorias.filter((c) => c.id !== elementoEliminar.id));
    }
  };

  // Funciones CRUD para subcategorías
  const saveSubcategoria = (subcategoriaData) => {
    if (!categoriaPadreActual) return;

    const nuevasCategorias = categorias.map((categoria) => {
      if (categoria.id === categoriaPadreActual.id) {
        if (modalSubcategoriaMode === "crear") {
          // Agregar nueva subcategoría
          return {
            ...categoria,
            subcategorias: [
              ...(categoria.subcategorias || []),
              subcategoriaData,
            ],
          };
        } else {
          // Actualizar subcategoría existente
          return {
            ...categoria,
            subcategorias: categoria.subcategorias.map((sub) =>
              sub.id === subcategoriaData.id ? subcategoriaData : sub
            ),
          };
        }
      }
      return categoria;
    });

    setCategorias(nuevasCategorias);
  };

  const deleteSubcategoria = () => {
    if (elementoEliminar && tipoElementoEliminar === "subcategoria") {
      const { categoriaPadre, subcategoria } = elementoEliminar;

      const nuevasCategorias = categorias.map((categoria) => {
        if (categoria.id === categoriaPadre.id) {
          return {
            ...categoria,
            subcategorias: categoria.subcategorias.filter(
              (sub) => sub.id !== subcategoria.id
            ),
          };
        }
        return categoria;
      });

      setCategorias(nuevasCategorias);
    }
  };

  // Función para manejar la eliminación según el tipo
  const handleConfirmDelete = () => {
    if (tipoElementoEliminar === "categoria") {
      deleteCategoria();
    } else if (tipoElementoEliminar === "subcategoria") {
      deleteSubcategoria();
    }
  };

  return (
    <section className="p-6">
      <div className="flex md:flex-row flex-col justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold font-firelli text-textoVerde">
          Categorías
        </h2>
        <Button
          className="bg-[#4F6B5F] text-white font-firelli"
          onClick={openCreateCategoriaModal}
        >
          Agregar nueva categoría
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((categoria) => (
          <Card key={categoria.id} className="max-w-full">
            <CardBody className="relative group">
              <div
                className="cursor-pointer"
                onClick={() => openEditCategoriaModal(categoria)}
              >
                <div className="relative h-40 mb-4">
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h3 className="text-xl font-bold text-white">
                      {categoria.nombre}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {categoria.descripcion}
                </p>
              </div>

              {/* Botones de acción para categoría */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                <Tooltip content="Editar categoría">
                  <Button
                    isIconOnly
                    size="sm"
                    color="primary"
                    variant="flat"
                    className="bg-white/80 backdrop-blur-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditCategoriaModal(categoria);
                    }}
                  >
                    <EditIcon />
                  </Button>
                </Tooltip>
                <Tooltip content="Eliminar categoría" color="danger">
                  <Button
                    isIconOnly
                    size="sm"
                    color="danger"
                    variant="flat"
                    className="bg-white/80 backdrop-blur-md"
                    onClick={(e) => openConfirmDeleteCategoria(categoria, e)}
                  >
                    <DeleteIcon />
                  </Button>
                </Tooltip>
                <Tooltip content="Agregar subcategoría" color="success">
                  <Button
                    isIconOnly
                    size="sm"
                    color="success"
                    variant="flat"
                    className="bg-white/80 backdrop-blur-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      openCreateSubcategoriaModal(categoria);
                    }}
                  >
                    <AddIcon />
                  </Button>
                </Tooltip>
              </div>

              {/* Badge con contador de subcategorías */}
              {categoria.subcategorias &&
                categoria.subcategorias.length > 0 && (
                  <Badge
                    content={categoria.subcategorias.length}
                    color="primary"
                    shape="circle"
                    placement="top-right"
                    className="absolute top-2 left-2"
                  >
                    <div className="w-4 h-4"></div>
                  </Badge>
                )}
            </CardBody>

            {/* Subcategorías */}
            {categoria.subcategorias && categoria.subcategorias.length > 0 && (
              <>
                <Divider />
                <CardFooter className="flex flex-col items-start p-4">
                  <p className="text-sm font-semibold mb-2">Subcategorías:</p>
                  <div className="w-full space-y-2">
                    {categoria.subcategorias.map((subcategoria) => (
                      <div
                        key={subcategoria.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 relative group/sub"
                      >
                        <div
                          className="flex items-center gap-3 cursor-pointer flex-1"
                          onClick={() =>
                            openEditSubcategoriaModal(categoria, subcategoria)
                          }
                        >
                          <div>
                            <p className="text-sm font-medium">
                              {subcategoria.nombre}
                            </p>
                          </div>
                        </div>

                        {/* Botones de acción para subcategoría */}
                        <div className=" flex gap-1">
                          <Tooltip content="Editar subcategoría">
                            <Button
                              isIconOnly
                              size="sm"
                              color="primary"
                              variant="flat"
                              className="bg-white/80 backdrop-blur-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditSubcategoriaModal(
                                  categoria,
                                  subcategoria
                                );
                              }}
                            >
                              <EditIcon size={14} />
                            </Button>
                          </Tooltip>
                          <Tooltip
                            content="Eliminar subcategoría"
                            color="danger"
                          >
                            <Button
                              isIconOnly
                              size="sm"
                              color="danger"
                              variant="flat"
                              className="bg-white/80 backdrop-blur-md"
                              onClick={(e) =>
                                openConfirmDeleteSubcategoria(
                                  categoria,
                                  subcategoria,
                                  e
                                )
                              }
                            >
                              <DeleteIcon size={14} />
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardFooter>
              </>
            )}
          </Card>
        ))}
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
            ? `¿Está seguro que desea eliminar la categoría "${elementoEliminar?.nombre}"? Esta acción eliminará también todas sus subcategorías.`
            : `¿Está seguro que desea eliminar la subcategoría "${elementoEliminar?.subcategoria?.nombre}"?`
        }
      />
    </section>
  );
}

// Iconos para los botones
const EditIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DeleteIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 5.97998C17.67 5.64998 14.32 5.47998 10.98 5.47998C9 5.47998 7.02 5.57998 5.04 5.77998L3 5.97998"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.85 9.14001L18.2 19.21C18.09 20.78 18 22 15.21 22H8.79002C6.00002 22 5.91002 20.78 5.80002 19.21L5.15002 9.14001"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.33 16.5H13.66"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 12.5H14.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AddIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16 12.75H12.75V16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16V12.75H8C7.59 12.75 7.25 12.41 7.25 12C7.25 11.59 7.59 11.25 8 11.25H11.25V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V11.25H16C16.41 11.25 16.75 11.59 16.75 12C16.75 12.41 16.41 12.75 16 12.75Z"
      fill="currentColor"
    />
  </svg>
);
