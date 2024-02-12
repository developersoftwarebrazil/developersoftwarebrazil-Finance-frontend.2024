import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // variaveis
  loginForm: FormGroup;
  inputFocused: boolean = false;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
  ) { }

  // metodos
  // executado ao iniciar a página
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group
      ({
        email: ["", [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      })
  }

   // Método para remover a borda do input quando ocorre o evento focus
   onFocus() {
    this.inputFocused = true;
  }
  onBlur() {
    this.inputFocused = false;
  }

  // pega os dados do usuário
  get formData() {
    return this, this.loginForm.controls;
  }

  // metodo executado apos o dados serem preenchido no formulário
  userLogin() {
    alert('ok')
  }
}
