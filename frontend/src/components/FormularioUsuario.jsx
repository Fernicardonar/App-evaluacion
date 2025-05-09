import React, { useState } from 'react';
import axios from '../services/axios';

const FormularioUsuario = () => {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    cedula: '',
    contraseña: '',
    rol: 'docente',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/usuarios', form);
      alert('Usuario registrado correctamente ✅');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Error al registrar usuario ❌');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded max-w-md mx-auto mt-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Registro de Usuario</h2>

      <input name="nombre" placeholder="Nombre" onChange={handleChange} value={form.nombre} className="w-full p-2 border mb-2" />
      <input name="correo" placeholder="Correo" onChange={handleChange} value={form.correo} className="w-full p-2 border mb-2" />
      <input name="cedula" placeholder="Cédula" onChange={handleChange} value={form.cedula} className="w-full p-2 border mb-2" />
      <input name="contraseña_hash" placeholder="Contraseña" type="password" onChange={handleChange} value={form.contraseña_hash} className="w-full p-2 border mb-2" />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Registrar
      </button>
    </form>
  );
};

export default FormularioUsuario;
console.log('Datos enviados:', { nombre, correo, cedula, contraseña, rol });
