import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore.jsx";
const CardLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        navigate("/Admin/Dashboard");
      } else {
        setError(result.message || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-204px)] flex items-center justify-center bg-gradient-to-b from-white to-[#F4EAE2]/10 py-10">
      <div className="w-[90%] max-w-4xl mx-auto rounded-2xl shadow-[0_10px_40px_-15px_rgba(79,107,95,0.25)] flex flex-col md:flex-row overflow-hidden my-8">
        {/* Image Section */}
        <div className="md:w-5/12 relative hidden md:block h-auto">
          <div className="absolute inset-0 bg-[#4F6B5F]">
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="h-full w-full"
              >
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  d="M0,0 L100,0 L100,100 L0,100 Z"
                  vectorEffect="non-scaling-stroke"
                ></path>
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  d="M0,0 L100,100 M100,0 L0,100"
                  vectorEffect="non-scaling-stroke"
                ></path>
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="text-white space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 9V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1" />
                    <path d="M2 13h10" />
                    <path d="M5 13l-3 3 3 3" />
                  </svg>
                </div>
                <h2 className="text-2xl font-firelli font-bold text-center">
                  Panel Administrativo
                </h2>
                <p className="text-white/70 text-center font-firelli text-sm">
                  Gestiona tus productos, servicios y más desde un solo lugar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-7/12 bg-white p-6 md:p-8">
          <div className="flex flex-col py-4 gap-2">
            <p className="text-2xl font-firelli font-bold text-[#4F6B5F]">
              Bienvenido Admin
            </p>
            <p className="font-firelli text-[#4F6B5F]/60 text-base">
              Ingresa tus credenciales
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full justify-between gap-5 mt-2"
          >
            <Input
              label="Email"
              type="email"
              variant="bordered"
              className="rounded-lg border-[#4F6B5F]/20 focus:border-[#4F6B5F] transition-all duration-200"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Contraseña"
              type="password"
              variant="bordered"
              className="rounded-lg border-[#4F6B5F]/20 focus:border-[#4F6B5F] transition-all duration-200"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              className="font-firelli bg-[#4F6B5F] text-white w-full py-5 rounded-lg text-base tracking-wide transition-all duration-200 hover:bg-[#3D5A4D] hover:shadow-md mt-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Ingresando...
                </div>
              ) : (
                "Ingresar"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardLogin;
