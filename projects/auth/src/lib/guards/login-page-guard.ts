import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Auth, getAuth, User } from "firebase/auth";

export const loginPageGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const auth = getAuth();

  try {
    const user = await getCurrentUser(auth);
    return user ? router.createUrlTree(["/home"]) : true;
  } catch (error) {
    console.error("Error checking auth state:", error);
    return true;
  }
};


function getCurrentUser(auth: Auth): Promise<User | null> {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      (user: User | null) => {
        unsubscribe();
        resolve(user);
      },
      (error) => {
        unsubscribe();
        reject(error);
      }
    );
  });
}
