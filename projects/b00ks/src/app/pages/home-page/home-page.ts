import { Component } from "@angular/core";
import { getAuth } from "firebase/auth";

@Component({
  selector: "app-home-page",
  imports: [],
  templateUrl: "./home-page.html",
  styleUrl: "./home-page.scss",
})
export class HomePage {
  public auth = getAuth();
}
