import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { UsuariosComponent } from './pages/admin/usuarios/usuarios.component';


export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'admin/usuarios',
                component: UsuariosComponent,
                canActivate: [AdminGuard] // Protegido (só ADMIN)
            },
        
            
        ]
    },

    { path: '**', redirectTo: 'login' }
];