import { Routes } from "@angular/router";
import { authGuard, loginPageGuard } from "auth";

export const routes: Routes = [
    {
        path: "login",
        canActivate: [loginPageGuard],
        loadComponent: () => import("auth").then(m => m.LoginPage),
    },
    {
        path: "home",
        canActivate: [authGuard],
        loadComponent: () => import("./pages/home-page/home-page").then(m => m.HomePage)
    },
    {
        path: "**",
        redirectTo: "login"
    }
];
