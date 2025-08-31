// Importación de los módulos de rutas para diferentes entidades
import elementos from './elementosRoutes.js'; // Rutas para la entidad 'elementos'
import fotos from './fotosRoutes.js'; // Rutas para la entidad 'fotos'
import reportes from './reportesRoutes.js'; // Rutas para la entidad 'reportes'
import tiposElementos from './tiposElementosRoutes.js'; // Rutas para la entidad 'tipos de elementos'
import estados from './estadosRoutes.js'; // Rutas para la entidad 'estados'
import ambientes from './ambientesRoutes.js'; // Rutas para la entidad 'ambientes'
import centros from './centrosRoutes.js'; // Rutas para la entidad 'centros'
import inventarios from './inventariosRoutes.js'; // Rutas para la entidad 'inventarios'
import rolesUsuarios from './rolesUsuariosRoutes.js'; // Rutas para la entidad 'roles de usuarios'
import usuarios from './usuariosRoutes.js'; // Rutas para la entidad 'usuarios'
import generos from './generosRoutes.js'; // Rutas para la entidad 'géneros'
import fichas from './fichasRoutes.js'; // Rutas para la entidad 'fichas'
import programaFormacion from './programasFormacion.js'; // Rutas para la entidad 'programas de formación'
import tiposDocumentos from './tiposDocumentosRoutes.js'; // Rutas para la entidad 'tipos de documentos'
import permisosRoles from './permisosRolesRoutes.js'; // Rutas para la entidad 'permisos de roles'
import permisos from './permisosRoutes.js'; // Rutas para la entidad 'permisos'
import roles from './rolesRoutes.js'; // Rutas para la entidad 'roles'
import auth from './authRoutes.js'; // Rutas para la autenticación
import access from './accesosRoutes.js'; // Rutas para la gestión de códigos de acceso a inventarios

// Definición de las rutas de la API
const rutas = [
  { path: '/fotos', router: fotos }, // Ruta para manejar fotos
  { path: '/reportes', router: reportes }, // Ruta para manejar reportes
  { path: '/elementos', router: elementos }, // Ruta para manejar elementos
  { path: '/tipos-elementos', router: tiposElementos }, // Ruta para manejar tipos de elementos
  { path: '/estados', router: estados }, // Ruta para manejar estados
  { path: '/ambientes', router: ambientes }, // Ruta para manejar ambientes
  { path: '/centros', router: centros }, // Ruta para manejar centros
  { path: '/inventarios', router: inventarios }, // Ruta para manejar inventarios
  { path: '/roles-usuarios', router: rolesUsuarios }, // Ruta para manejar roles de usuarios
  { path: '/usuarios', router: usuarios }, // Ruta para manejar usuarios
  { path: '/generos', router: generos }, // Ruta para manejar géneros
  { path: '/fichas', router: fichas }, // Ruta para manejar fichas
  { path: '/programas-formacion', router: programaFormacion }, // Ruta para manejar programas de formación
  { path: '/tipos-documentos', router: tiposDocumentos }, // Ruta para manejar tipos de documentos
  { path: '/permisos-roles', router: permisosRoles }, // Ruta para manejar permisos de roles
  { path: '/permisos', router: permisos }, // Ruta para manejar permisos
  { path: '/roles', router: roles }, // Ruta para manejar roles
  { path: '/auth', router: auth }, // Ruta para manejar la autenticación
  { path: '/accesos', router: access }, // Ruta para manejar los códigos de acceso a inventarios
];

// Exporta el array de rutas como valor por defecto del módulo
export default rutas;
