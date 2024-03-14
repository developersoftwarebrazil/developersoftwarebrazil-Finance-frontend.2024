import { Component, Renderer2 } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginService } from "../../../services/login.service";
import { ETheme } from "../../../../enums/EThemes.enum";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthService } from "../../../services/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  // variaveis
  loginForm: FormGroup;
  inputFocused: boolean = false;

  public icon: string = ETheme.ICON_MOON;
  public textTheme = ETheme.TEXT_MOON;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private loginService: LoginService,
    public formBuilder: FormBuilder,
    public authService: AuthService

  ) { }

  // metodos
  // executado ao iniciar a página
  ngOnInit(): void {
    this.toggleTheme();
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
    this.loginService.login(this.formData["email"].value, this.formData['password'].value)
    .subscribe(token => {
        this.authService.setToken(token);
        this.authService.authenticatedUser(true);
        alert(token);
        this.router.navigate(['/dashboard']);
      },
        err => {
          alert('Houve um erro ao tentar fazer o login!');
        }
      )
  }

  toggleTheme() {
    const theme = document.body.classList.toggle('darkMode');
    if (theme) {
      return (
        this.textTheme = ETheme.TEXT_SUN,
        this.icon = ETheme.ICON_SUN
      )
    }
    return (
      this.textTheme = ETheme.TEXT_MOON,
      this.icon = ETheme.ICON_MOON
    )
  }
}


