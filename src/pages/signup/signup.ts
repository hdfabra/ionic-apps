import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  IonicPage,
  NavController,
  ToastController,
  Events
} from "ionic-angular";

import { User, Api } from "../../providers";
import { MainPage } from "../";
import { LoginServiceProvider } from "../../providers/login-service/login-service";
import { Usuario } from "../../shared/user";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: Usuario = {
    usuario: "",
    username: "",
    correo: "test@example.com",
    password: "test",
    primernombre: "",
    segundonombre: ""
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(
    public navCtrl: NavController,
    public user: User,
    public translateService: TranslateService,
    public loginservice: LoginServiceProvider,
    public events: Events
  ) {
    events.subscribe("user:created", (user, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.navCtrl.push(MainPage);
      console.log("Welcome", user, "at", time);
    });

    this.translateService.get("SIGNUP_ERROR").subscribe(value => {
      this.signupErrorString = value;
    });
  }

  doSignup() {
    this.loginservice.register(this.account).subscribe(
      usuario => {
        this.loginservice.login(this.account);
      },
      error => {}
    );
  }
}
