import { Injectable } from "@angular/core";
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

@Injectable({
  providedIn: "root",
})
export class FirebaseService {
  public app: FirebaseApp | null = null;
  public auth: Auth | null = null;
  public db: Firestore | null = null;

  public init(config: any): void {
    
    if(getApps().length === 0) {
      this.app = initializeApp(config);
    } else {
      this.app = getApp();
    }
    
    if (!this.app) return;
    
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
    
    console.log("Firebase initialization completed");
  }
}
