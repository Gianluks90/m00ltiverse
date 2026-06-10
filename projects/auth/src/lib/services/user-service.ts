import { inject, Injectable, signal } from "@angular/core";
import { doc, onSnapshot } from "firebase/firestore";
import { FirebaseService } from "shared-firebase";
import { mUser } from "shared-models";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private firebaseService = inject(FirebaseService);

  public user = signal<mUser | null>(null);

  public async getUserByUid(uid: string): Promise<void> {
    const userRef = doc(this.firebaseService.db, 'users', uid)
    const unsub = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data() as mUser
        this.user.set(userData)
      } else {
        this.user.set(null)
      }
    })
  }
}
