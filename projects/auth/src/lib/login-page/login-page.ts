import { Component, inject } from "@angular/core";
import { APP_CONFIG } from "shared-core";
import { AuthService } from "../services/auth-service";

@Component({
  selector: "lib-login-page",
  imports: [],
  templateUrl: "./login-page.html",
  styleUrl: "./login-page.scss",
})
export class LoginPage {
  readonly config = inject(APP_CONFIG);
  private authService = inject(AuthService);
  public onLogin() {
    this.authService.login(this.config.appName)
  };
}
