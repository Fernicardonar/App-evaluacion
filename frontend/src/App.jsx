import { useState } from 'react';
import FormularioUsuario from './components/FormularioUsuario';
import FormularioLogin from './components/FormularioLogin';
import CambiarContraseña from './components/CambiarContraseña';

function App() {
  const [pantalla, setPantalla] = useState('registro'); // 'login' o 'registro'
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setPantalla('registro')}
          className={`px-4 py-2 rounded ${pantalla === 'registro' ? 'bg-green-600 text-white' : 'bg-white border'}`}
        >
          Registrar Docente
        </button>
        <button
          onClick={() => setPantalla('login')}
          className={`px-4 py-2 rounded ${pantalla === 'login' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
        >
          Iniciar Sesión
        </button>
        <button
        onClick={() => setPantalla('Cambiar')}
        className={`px-4 py-2 rounded ${pantalla === 'cambiar' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
        >
        | Cambiar Contraseña
        </button>

      </div>

      {pantalla === 'registro' && <FormularioUsuario />}
      {pantalla === 'login' && <FormularioLogin />}
      {pantalla === 'cambiar' && <CambiarContraseña />}
    </div>
    

  );
}

export default App;
