import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.html',
  styleUrls: ['./login-screen.css'],
  imports: [ReactiveFormsModule]
})
export class LoginScreen {
  //quando a tela iniciar


  loginForm: FormGroup;

emailErrorMessage: string;
passwordErrorMessage: string;
successLogin:string;
incorrectCredentials:string;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {

    this.loginForm = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })

    this.passwordErrorMessage ="";
    this.emailErrorMessage="";
    this.successLogin = "";
    this.incorrectCredentials ="";
  }



  async onLoginClick() {
    let response = await fetch("https://senai-gpt-api.azurewebsites.net/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      })
    });


    if (this.loginForm.value.email != "" && this.loginForm.value.password != "") {

      let response = await fetch("https://senai-gpt-api.azurewebsites.net/login", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email: this.loginForm.value.email,
          password: this.loginForm.value.password
        })
      });

      if (response.status >= 200 && response.status <= 299) {
       this.successLogin = "Login efetuado com sucesso!";

       let json = await response.json();

       console.log("JSON",json)

       let meuToken = json.accessToken;
       let meuId = json.user.id;

       localStorage.setItem("meuToken",meuToken);
       localStorage.setItem("meuId",meuId);


       window.location.href ="notes";

      } else {
        this.incorrectCredentials = "Credenciais incorretas!";
      }
    } else {
      this.incorrectCredentials = "Por favor preencha os campos de login e senha";
    }
    this.cd.detectChanges(); //forcar uma atualizacao da tela
  }
}

