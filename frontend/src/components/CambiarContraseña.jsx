import { useState } from 'react';
import axios from '../services/axios';

const CambiarContraseña = () => {
  const [correo, setCorreo] = useState('');
  const [contraseñaActual, setContraseñaActual] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/usuarios/cambiar-contraseña', {
        correo,
        contraseña_actual: contraseñaActual,
        nueva_contraseña: nuevaContraseña,
      });
      setMensaje(res.data.mensaje);
    } catch (error) {
      setMensaje(error.response?.data?.error || 'Error al cambiar contraseña');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto mt-6 border rounded shadow">
      <h2 className="text-lg font-bold mb-4 text-center">Cambiar Contraseña</h2>
      <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full p-2 border mb-2" required />
      <input type="password" placeholder="Contraseña actual" value={contraseñaActual} onChange={(e) => setContraseñaActual(e.target.value)} className="w-full p-2 border mb-2" required />
      <input type="password" placeholder="Nueva contraseña" value={nuevaContraseña} onChange={(e) => setNuevaContraseña(e.target.value)} className="w-full p-2 border mb-2" required />
      <button type="submit" className="bg-purple-600 text-white w-full py-2 rounded hover:bg-purple-700">Cambiar Contraseña</button>
      {mensaje && <p className="mt-2 text-center text-sm">{mensaje}</p>}
    </form>
  );
};

export default CambiarContraseña;
