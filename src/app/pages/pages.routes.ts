import { RouterModule, Routes, CanActivate } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/services.index';
import { UsuarioComponent } from './usuarios/usuario.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';




const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Observables' } },
            { path: 'account-setting', component: AccountSettingsComponent, data: { titulo: 'Ajustes del tema' }},
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Busqueda' } },


            // Mantenimientos
            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate : [ AdminGuard ],
                data: { titulo: 'Mantenimiento de usuarios' }
            },
            {
                path: 'hospitales',
                component: HospitalesComponent,
                canActivate : [ VerificaTokenGuard ],
                data: { titulo: 'Mantenimiento de hospitales' }
            },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de medicos' } },
            { path: 'usuario/:id', component: UsuarioComponent, data: { titulo: 'Actualizar usuario' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

            // Elementos

           // { path: 'grid', component: GridComponent, data: { titulo: '' } },

        ]
    },



];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );


