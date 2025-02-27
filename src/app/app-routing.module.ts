import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth/auth.guard';
import { LoggedInAuthGuard } from './modules/auth/guards/logged-in/logged-in-guard.guard';
import { AdminGuard } from './modules/sudo/guards/admin-guard/admin.guard';
import { ErrorComponent } from './modules/shared/components/error/error.component';
import { LoginPageComponent } from './modules/auth/components/login-page/login-page.component';
import { RegisterPageComponent } from './modules/auth/components/register-page/register-page.component';

const routes: Routes = [

    // Auth module - not lazy loaded
    { path: 'prijava', component: LoginPageComponent, canActivate: [LoggedInAuthGuard] },
    { path: 'login', redirectTo: 'prijava', pathMatch: 'full' },
    { path: 'registracija', component: RegisterPageComponent, canActivate: [LoggedInAuthGuard] },
    { path: 'register', redirectTo: 'registracija', pathMatch: 'full' },

    // Home module
    { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },

    // Search module
    { path: 'iskanje', loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule), canActivate: [AuthGuard] },

    // User module
    { path: 'u', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule), canActivate: [AuthGuard] },

    // Recommned module
    { path: 'razisci', loadChildren: () => import('./modules/recommend/recommend.module').then(m => m.RecommendModule), canActivate: [AuthGuard] },

    // Sudo module - guards defined in the module
    { path: '', loadChildren: () => import('./modules/sudo/sudo.module').then(m => m.SudoModule) },

    // About module
    { path: '', loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule) },

    // 404 error page
    { path: '**', component: ErrorComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        AuthGuard,
        LoggedInAuthGuard,
        AdminGuard
    ]
})
export class AppRoutingModule { }
