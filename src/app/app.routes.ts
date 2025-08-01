import { Routes } from '@angular/router';
import { PaginaError } from './components/pagina-error/pagina-error';
import { Inicio } from './page/inicio/inicio';
import { Contactenos } from './page/contactenos/contactenos';
import { PreguntasFrecuentes } from './page/preguntas-frecuentes/preguntas-frecuentes';
import { SobreNosotros } from './page/sobre-nosotros/sobre-nosotros';
import { IniciarSesion } from './page/iniciar-sesion/iniciar-sesion';
import { Usuario } from './page/usuario/usuario';
import { Reportes } from './page/reportes/reportes';
import { Dashboard } from './page/dashboard/dashboard';
import { RegistroDiscapacitados } from './page/registro-discapacitados/registro-discapacitados';
import { GPS } from './page/gps/gps';
import { RegistroUser } from './page/registro-user/registro-user';
import { Admin } from './page/admin/admin';
import { RegistroUsu } from './components/admin/registro-usu/registro-usu';


export const routes: Routes = [
    { path: '', component: Inicio },
    { path: 'preguntas-frecuentes', component: PreguntasFrecuentes },
    { path: 'contactenos', component: Contactenos },
    { path: 'sobre-nosotros', component: SobreNosotros },
    { path: 'Iniciar-Sesion', component: IniciarSesion },
    { path: 'usuario', component: Usuario },
    { path: 'reportes', component: Reportes },
    { path: 'dashboard', component: Dashboard },
    { path: 'RegistroDiscapacitados', component: RegistroDiscapacitados },
    { path: 'GPS', component: GPS },
    { path: 'FormularioRegistro', component: RegistroUser },
    { path: 'Sistema-Administrativo', component: Admin },
    // ADMINISTRADOR
    { path: 'registro-usuario', component: RegistroUsu },
    { path: '**', component: PaginaError }
];