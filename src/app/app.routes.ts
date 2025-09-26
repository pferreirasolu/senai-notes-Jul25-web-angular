import { Routes } from '@angular/router';
import { LoginScreen } from './user-module/login-screen/login-screen';
import { NewUserComponent } from './user-module/new-user/new-user.component';
import { NotesScreen } from './notes-screen/notes-screen';

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
    },
        {
        path:"notes",
        loadComponent: () =>NotesScreen

    }
];
