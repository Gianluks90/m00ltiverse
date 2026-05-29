import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Auth, getAuth, User } from "firebase/auth";

export const loginPageGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = getAuth();
  return getCurrentUser(auth).then(user => {
    if (user) {
      router.navigate(["/home"]);
      return true;
    } else {
      router.navigate(["/login"]);
      return false;
    }
  });
};


function getCurrentUser(auth: Auth): Promise<User> {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        reject(new Error("No user is currently signed in."));
      }
    }, reject);
  });
}
