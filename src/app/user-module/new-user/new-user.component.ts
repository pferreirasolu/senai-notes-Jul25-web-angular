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

  nameErrorMessage: string;
  emailUser: string;
  passwordErrorMessage: string;
  newPasswordErrorMessage: string;



  constructor(private fb: FormBuilder) {

    this.newUserScreenLoginForm = this.fb.group({
      newUser: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      newPassword: ["", [Validators.required]]
    })

    this.nameErrorMessage ="";
    this.emailUser ="";
    this.passwordErrorMessage="";
    this.newPasswordErrorMessage="";

  }


    async onCadastro() {
        const token = localStorage.getItem("meuToken");

        if (this.newUserScreenLoginForm.value.name =="") {
          this.nameErrorMessage ="Email do usuario nao pode ser em branco";
          }

        if (this.newUserScreenLoginForm.value.email =="") {
          this.nameErrorMessage ="Senha do usuario nao pode ser em branco";
          }
        if (this.newUserScreenLoginForm.value.password =="") {
          this.nameErrorMessage ="Confirmação de senha nao pode ser em branco";
          }
          
    let response = await fetch("https://senai-gpt-api.azurewebsites.net/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          newUser: this.newUserScreenLoginForm.value.newUser,
          email: this.newUserScreenLoginForm.value.email,
          password: this.newUserScreenLoginForm.value.password,
          newPassword: this.newUserScreenLoginForm.value.newPassword
        })
      });
    }

  }


