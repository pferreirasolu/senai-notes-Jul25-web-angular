import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  imports: [ReactiveFormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})

   
export class NewUserComponent {

  newUserScreenLoginForm: FormGroup;

  nome: string;
  email: string;
  senha: string;
  newPasswordErrorMessage: string;



  constructor(private fb: FormBuilder) {

    this.newUserScreenLoginForm = this.fb.group({
      nome: ["", [Validators.required]],
      email: ["", [Validators.required]],
      senha: ["", [Validators.required]],
      newPassword: ["", [Validators.required]]
    })

    this.nome ="";
    this.email ="";
    this.senha="";
    this.newPasswordErrorMessage="";

  }


    async onCadastro() {
        const token = localStorage.getItem("meuToken");

        if (this.newUserScreenLoginForm.value.name =="") {
          this.nome="Email do usuario nao pode ser em branco";
          }

        if (this.newUserScreenLoginForm.value.email =="") {
          this.nome ="Senha do usuario nao pode ser em branco";
          }
        if (this.newUserScreenLoginForm.value.password =="") {
          this.nome ="Confirmação de senha nao pode ser em branco";
          }
          
    let response = await fetch("http://senainotes-env-1.eba-xtvmn99j.us-east-1.elasticbeanstalk.com/api/usuarios/cadastras", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nome: this.newUserScreenLoginForm.value.nome,
          email: this.newUserScreenLoginForm.value.email,
          senha: this.newUserScreenLoginForm.value.senha,
        }),

        
      });
      window.location.href="login"
    }

  }


