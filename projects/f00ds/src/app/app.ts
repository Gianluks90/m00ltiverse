import { Component, effect, inject, signal } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { ThemeService } from 'shared-core';
import { FirebaseService } from 'shared-firebase'
import { FIREBASE_CONFIG } from "../environments/environments";
import { getAuth, User } from "firebase/auth";
import { UserService } from "auth";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("f00ds");
  private router = inject(Router);
  private userService = inject(UserService);

  public user = this.userService.user;

  constructor(private readonly themeService: ThemeService, private firebaseService: FirebaseService) {
    this.themeService.init();
    this.firebaseService.init(FIREBASE_CONFIG);

    getAuth().onAuthStateChanged((user: User | null) => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.userService.getUserByUid(user.uid)
      }
    });

    effect(() => {
      console.log(this.user())
    })
  }


}
