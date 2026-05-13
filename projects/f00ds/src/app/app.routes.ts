import { Routes } from "@angular/router";

export const routes: Routes = [
        {
        path: "login",
        loadComponent: () => import("auth").then(m => m.LoginPage)
    },
    {
        path: "**",
        redirectTo: "login"
    }
];
