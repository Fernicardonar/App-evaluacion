const express = require('express');
const router = express.Router();


const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  loginUsuario,
  cambiarContraseña
} = require('../controllers/usuarios.controller');

router.get('/', getUsuarios);
router.post('/', crearUsuario);
router.post('/login', loginUsuario); // ← nueva ruta
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);
router.post('/cambiar-contraseña', cambiarContraseña);


module.exports = router;

