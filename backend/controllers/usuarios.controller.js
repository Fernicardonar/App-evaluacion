const bcrypt = require('bcryptjs');
const prisma = require('../index');

// GET todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// POST nuevo usuario
const crearUsuario = async (req, res) => {
  const { nombre, correo, cedula, contraseña, rol } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contraseña, salt);

    const nuevo = await prisma.usuario.create({
      data: {
        nombre,
        correo,
        cedula,
        contraseña_hash: hash,
        rol,
      },
    });

    res.status(201).json(nuevo);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(400).json({ error: 'Error al crear usuario' });
  }
};

// PUT actualizar usuario
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const datos = req.body;
  try {
    const actualizado = await prisma.usuario.update({
      where: { id_usuario: id },
      data: datos,
    });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar' });
  }
};

// DELETE eliminar usuario
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.usuario.delete({ where: { id_usuario: id } });
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar' });
  }
};

// POST login
const loginUsuario = async (req, res) => {
  console.log('💡 loginUsuario fue ejecutado');
  console.log('Login recibido:', req.body); // 👈 Agrega esto al inicio

  const { correo, contraseña } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { correo },
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Correo o contraseña incorrecta' });
    }

    console.log('Contraseña ingresada:', contraseña);
    console.log('Hash en base de datos:', usuario.contraseña_hash);

    const validPassword = await bcrypt.compare(contraseña, usuario.contraseña_hash);

    console.log('¿Contraseña válida?', validPassword);

    if (!validPassword) {
      return res.status(401).json({ error: 'Correo o contraseña incorrecta' });
    }

    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }

};

// POST cambiar contraseña
const cambiarContraseña = async (req, res) => {
  const { correo, contraseña_actual, nueva_contraseña } = req.body;

  try {
    const usuario = await prisma.usuario.findUnique({ where: { correo } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const valid = await bcrypt.compare(contraseña_actual, usuario.contraseña_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Contraseña actual incorrecta' });
    }

    const salt = await bcrypt.genSalt(10);
    const nuevaHash = await bcrypt.hash(nueva_contraseña, salt);

    await prisma.usuario.update({
      where: { correo },
      data: { contraseña_hash: nuevaHash },
    });

    res.status(200).json({ mensaje: 'Contraseña actualizada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cambiar la contraseña' });
  }
};


// ✅ Exportar todo desde un solo lugar al final
module.exports = {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  loginUsuario,
  cambiarContraseña,
};
