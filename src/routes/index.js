import elementos from './elementosRoutes.js';
import fotos from './fotosRoutes.js';
import reportes from './reportesRoutes.js';
import tiposElementos from './tiposElementosRoutes.js';
import estados from './estadosRoutes.js';
import ambientes from './ambientesRoutes.js';
import centros from './centrosRoutes.js';
import inventarios from './inventariosRoutes.js';
import rolesUsuarios from './rolesUsuariosRoutes.js';
import usuarios from './usuariosRoutes.js';
import generos from './generosRoutes.js';
import fichas from './fichasRoutes.js';
import programaFormacion from './programasFormacion.js';
import tiposDocumentos from './tiposDocumentosRoutes.js';
import permisosRoles from './permisosRolesRoutes.js';
import permisos from './permisosRoutes.js';
import roles from './rolesRoutes.js';

const rutas = [
  { path: '/fotos', router: fotos },
  { path: '/reportes', router: reportes },
  { path: '/elementos', router: elementos },
  { path: '/tipos-elementos', router: tiposElementos },
  { path: '/estados', router: estados },
  { path: '/ambientes', router: ambientes },
  { path: '/centros', router: centros },
  { path: '/inventarios', router: inventarios },
  { path: '/roles-usuarios', router: rolesUsuarios },
  { path: '/usuarios', router: usuarios },
  { path: '/generos', router: generos },
  { path: '/fichas', router: fichas },
  { path: '/programas-formacion', router: programaFormacion },
  { path: '/tipos-documentos', router: tiposDocumentos },
  { path: '/permisos-roles', router: permisosRoles },
  { path: '/permisos', router: permisos },
  { path: '/roles', router: roles },
];

export default rutas;
