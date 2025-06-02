import { Routes } from '@angular/router';
import { InicioComponent } from './page/inicio/inicio.component';
import { SobreNosotrosComponent } from './page/sobre-nosotros/sobre-nosotros.component';
import { PreguntasFrecuentesComponent } from './page/preguntas-frecuentes/preguntas-frecuentes.component';
import { ContactenosComponent } from './page/contactenos/contactenos.component';
import { PaginaErrorComponent } from './components/pagina-error/pagina-error.component';
import { ReportesComponent } from './page/reportes/reportes.component';
import { UsuarioComponent } from './page/usuario/usuario.component';
import { Modulo1Component } from './page/modulo1/modulo1.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { InicioSesionComponent } from './page/inicio-sesion/inicio-sesion.component';
import { GestionUsuarioComponent } from './page/gestion-usuario/gestion-usuario.component';
import { Modulo2Component } from './page/modulo2/modulo2.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'sobre-nosotros', component: SobreNosotrosComponent },
    { path: 'preguntas-frecuentes', component: PreguntasFrecuentesComponent },
    { path: 'contactenos', component: ContactenosComponent },
    { path: 'reportes', component: ReportesComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'modulo1', component: Modulo1Component },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'iniciosesion', component: InicioSesionComponent },
    { path: 'gestionUsu', component: GestionUsuarioComponent },
    { path: 'modulo2', component: Modulo2Component },
    { path: '**', component: PaginaErrorComponent }
];


