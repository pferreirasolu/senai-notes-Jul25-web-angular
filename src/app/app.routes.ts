import { Routes } from '@angular/router';
import { LoginScreen } from './user-module/login-screen/login-screen';
import { NewUserComponent } from './user-module/new-user/new-user.component';

export const routes: Routes = [

    {
        path:"login",
        loadComponent: () =>LoginScreen

    },
        {
        path:"",
        loadComponent: () =>LoginScreen

    },
    {
        path:"cadastro",
        loadComponent: () =>NewUserComponent

    }



];
