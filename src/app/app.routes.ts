import { Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { EstoqueComponent } from './pages/admin/estoque/estoque.component';
import { UsuariosComponent } from './pages/admin/usuarios/usuarios.component';
import { LoginComponent } from './pages/login/login.component';
import { OperadorGuard } from './core/guards/operador.guard';
import { CaixaComponent } from './pages/caixa/caixa.component';

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
            {
                path: 'admin/estoque',
                component: EstoqueComponent,
                canActivate: [AdminGuard] // Protegido (só ADMIN)
            },
            {
                path: 'caixa',
                component: CaixaComponent,
                canActivate: [OperadorGuard] // Protegida (só OPERADOR)
            },
            
        ]
    },

    { path: '**', redirectTo: 'login' }
];