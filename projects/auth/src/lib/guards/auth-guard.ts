import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Auth, getAuth, User } from "firebase/auth";

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const auth = getAuth();

  try {
    const user = await getCurrentUser(auth);
    return user ? true : router.createUrlTree(["/login"]);
  } catch (error) {
    console.error("Error checking auth state:", error);
    return router.createUrlTree(["/login"]);
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
