import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ThemeService } from 'shared-core';
import { FirebaseService } from 'shared-firebase'
import { FIREBASE_CONFIG } from "../environments/environments";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("f00ds");

  constructor(private readonly themeService: ThemeService, private firebaseService: FirebaseService) {
    this.themeService.init();
    this.firebaseService.init(FIREBASE_CONFIG);
  }
}
