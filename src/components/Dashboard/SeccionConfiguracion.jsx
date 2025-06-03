import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  Button,
  Chip,
  Divider,
  Spinner,
} from "@heroui/react";
import {
  Settings,
  Edit3,
  Save,
  X,
  Mail,
  MapPin,
  Info,
  CheckCircle,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import useConfiguracion from "../../hooks/useConfiguracion";
import { ToastContainer } from "react-toastify";

function SeccionConfiguracion() {
  const { configuracion, loading, error, updateConfiguracion } =
    useConfiguracion();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    direccion: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  // Actualizar formData cuando se carga la configuración
  useEffect(() => {
    if (configuracion) {
      setFormData({
        email: configuracion.email || "",
        direccion: configuracion.direccion || "",
      });
    }
  }, [configuracion]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Restaurar datos originales
    if (configuracion) {
      setFormData({
        email: configuracion.email || "",
        direccion: configuracion.direccion || "",
      });
    }
  };

  const handleSave = async () => {
    if (!configuracion) return;

    setIsSaving(true);
    try {
      const updatedConfig = await updateConfiguracion({
        id: configuracion.id,
        email: formData.email,
        direccion: formData.direccion,
      });

      if (updatedConfig) {
        setIsEditing(false);
        toast.success("Configuración actualizada correctamente", {
          icon: "✅",
          style: {
            borderRadius: "12px",
            background: "#10b981",
            color: "#fff",
          },
        });
      } else {
        toast.error("Error al actualizar la configuración");
      }
    } catch (err) {
      console.error("Error al guardar:", err);
      toast.error("Error al guardar los cambios");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Card className="w-full max-w-sm sm:max-w-md mx-auto">
          <CardBody className="flex flex-col items-center justify-center py-8 sm:py-12">
            <Spinner size="lg" color="success" />
            <p className="mt-4 text-gray-600 text-sm sm:text-base text-center">
              Cargando configuración...
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Card className="w-full max-w-sm sm:max-w-md mx-auto border-l-4 border-l-danger">
          <CardBody className="py-6 sm:py-8">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-danger-100 rounded-full flex items-center justify-center">
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-danger-600" />
              </div>
              <div className="ml-3 sm:ml-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  Error
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">{error}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (!configuracion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <Card className="w-full max-w-sm sm:max-w-md mx-auto">
          <CardBody className="text-center py-8 sm:py-12">
            <Settings className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
              Sin Configuración
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              No se encontró configuración disponible
            </p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-4 sm:py-6 lg:py-8 md:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Toaster />
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-success-300 to-[#4F6B5F] rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg">
            <Settings className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
          </div>
          <h1 className="font-firelli text-2xl sm:text-3xl lg:text-4xl text-textoVerde mb-2 sm:mb-3 px-4">
            Configuración del Footer
          </h1>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Gestiona la información de contacto que aparece en el pie de página
            de tu sitio web
          </p>
        </div>

        {/* Main Configuration Card */}
        <Card className="mb-4 sm:mb-6 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-success-50 to-success-[#4F6B5F] pb-4 sm:pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-success-100 rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                  <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-textVerde" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Información de Contacto
                  </h2>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Datos que se muestran en el footer
                  </p>
                </div>
              </div>

              {!isEditing && (
                <Button
                  variant="shadow"
                  startContent={<Edit3 className="w-4 h-4" />}
                  onPress={handleEdit}
                  className="font-medium w-full sm:w-auto bg-[#4F6B5F] text-white"
                  size="sm"
                >
                  Editar
                </Button>
              )}
            </div>
          </CardHeader>

          <CardBody className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Email Section */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary-100 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    Email de Contacto
                  </span>
                </div>

                {isEditing ? (
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ejemplo@correo.com"
                    variant="bordered"
                    size="sm"
                    startContent={<Mail className="w-4 h-4 text-gray-400" />}
                    classNames={{
                      input: "text-gray-900",
                      inputWrapper:
                        "border-gray-200 hover:border-success-300 focus-within:border-success-500",
                    }}
                  />
                ) : (
                  <Card className="bg-gray-50 shadow-none">
                    <CardBody className="py-3 sm:py-4">
                      <p className="text-gray-900 font-medium text-sm sm:text-base">
                        {configuracion.email || "No configurado"}
                      </p>
                    </CardBody>
                  </Card>
                )}
              </div>

              {/* Dirección Section */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary-100 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-600" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    Dirección
                  </span>
                </div>

                {isEditing ? (
                  <Textarea
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    placeholder="Dirección completa"
                    variant="bordered"
                    size="sm"
                    minRows={3}
                    maxRows={4}
                    startContent={
                      <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                    }
                    classNames={{
                      input: "text-gray-900",
                      inputWrapper:
                        "border-gray-200 hover:border-success-300 focus-within:border-success-500",
                    }}
                  />
                ) : (
                  <Card className="bg-gray-50 shadow-none">
                    <CardBody className="py-3 sm:py-4 min-h-[80px] sm:min-h-[100px] flex items-start">
                      <p className="text-gray-900 font-medium text-sm sm:text-base">
                        {configuracion.direccion || "No configurado"}
                      </p>
                    </CardBody>
                  </Card>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <>
                <Divider className="my-4 sm:my-6" />
                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                  <Button
                    variant="bordered"
                    startContent={<X className="w-4 h-4" />}
                    onPress={handleCancel}
                    isDisabled={isSaving}
                    className="font-medium w-full sm:w-auto order-2 sm:order-1"
                    size="sm"
                  >
                    Cancelar
                  </Button>
                  <Button
                    color="success"
                    variant="shadow"
                    startContent={
                      isSaving ? (
                        <Spinner size="sm" color="white" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )
                    }
                    onPress={handleSave}
                    isLoading={isSaving}
                    className="font-medium w-full sm:w-auto order-1 sm:order-2"
                    size="sm"
                  >
                    {isSaving ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </div>
              </>
            )}
          </CardBody>
        </Card>

        {/* Info Card */}
        <Card className="bg-gradient-to-r from-primary-50 to-primary-100 shadow-lg">
          <CardBody className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Info className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-firelli text-base sm:text-lg text-textoVerde mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Información Importante
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-3">
                  Esta configuración se utiliza para mostrar los datos de
                  contacto en el footer de tu sitio web. Los cambios se
                  reflejarán automáticamente en todas las páginas una vez
                  guardados.
                </p>
                <Chip
                  color="success"
                  variant="flat"
                  size="sm"
                  startContent={<CheckCircle className="w-3 h-3" />}
                >
                  Actualización automática
                </Chip>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default SeccionConfiguracion;
