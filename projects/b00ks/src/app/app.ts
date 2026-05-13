import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ThemeService } from 'shared-core';

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("b00ks");

  constructor(private readonly themeService: ThemeService) {
    this.themeService.init()
  }
}
