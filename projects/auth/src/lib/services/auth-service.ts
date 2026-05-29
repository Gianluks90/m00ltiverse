import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseService } from 'shared-firebase'

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private router = inject(Router);
  private firebaseService = inject(FirebaseService);

  public async login(domain: string): Promise<void> {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await this.checkUserDocument(user, domain);
      await this.router.navigate(['/home'])
    } catch (error) {
      console.log("Authentication error: ", error)
    };

    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     const credential = GoogleAuthProvider.credentialFromResult(result); 
    //     const token = credential?.accessToken;
    //   })
  };
  public async logout(): Promise<void> {
    await getAuth().signOut();
    await this.router.navigate(['/login'])
  };

  private async checkUserDocument(user: User, domain: string): Promise<void> {
    const docRef = doc(this.firebaseService.db, "users", user.uid);
    const userDoc = await getDoc(docRef);

    if (userDoc.exists()) return;

    await this.createUserDocument(user, domain);
  };

  private async createUserDocument(user: User, domain: string): Promise<void> {
    const docRef = doc(this.firebaseService.db, "users", user.uid);
    const userData = {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: "user",
      createdAt: new Date().toISOString(),
      streak: 0,
      streakLastUpdated: new Date().toISOString(),
      bestStreak: 0,
      nickname: `${(user.displayName?.split(" ")[0] || "user")}.${domain}.${user.uid.slice(0,6)}`,
      challanges: [],
      shareUpdates: true,
      publicProfile: true,
      beta: true,
    };
    await setDoc(docRef, userData, { merge: true });
   };

}
