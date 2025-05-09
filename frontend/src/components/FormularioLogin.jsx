import { useState } from 'react';
import axios from '../services/axios';

const FormularioLogin = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const manejarLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/usuarios/login', {
        correo,
        contraseña,
      });
      setMensaje(res.data.mensaje);
    } catch (error) {
      setMensaje(error.response?.data?.error || 'Error de conexión');
    }
  };

  return (
    <form onSubmit={manejarLogin} className="p-4 max-w-md mx-auto mt-6 border rounded shadow">
      <h2 className="text-lg font-bold mb-4 text-center">Inicio de Sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        className="w-full p-2 border mb-2"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        className="w-full p-2 border mb-2"
        required
      />
      <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
        Iniciar Sesión
      </button>
      {mensaje && <p className="mt-2 text-center text-sm">{mensaje}</p>}
    </form>
  );
};

export default FormularioLogin;
