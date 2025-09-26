import { Routes } from '@angular/router';
import { LoginScreen } from './user-module/login-screen/login-screen';
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
        path:"notes",
        loadComponent: () =>NotesScreen

    }
];
