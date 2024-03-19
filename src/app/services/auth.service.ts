import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class AuthService {
  private authenticatedUserWeb: boolean = false;
  private token: any;
  private user: any;

  constructor(private httpClient: HttpClient) { }

  //Configurações para o usuário
  authenticatedUser(status: boolean) {
    localStorage.setItem('authenticatedUserWeb', JSON.stringify(status));
    this.authenticatedUserWeb = status;
  }

  userIsAuthenticated(): Promise<boolean> {
    this.authenticatedUserWeb = localStorage.getItem('authenticatedUserWeb') == 'true';
    return Promise.resolve(this.authenticatedUserWeb);
  }


  setUserEmail(email: string) {
    localStorage.setItem('userEmail', email);
  }

  getUserEmail() {
    var userEmailLogaded = localStorage.getItem('userEmail');

    if (userEmailLogaded) {
      return userEmailLogaded;
    } else {
      this.clearUserData();
      return ''
    }

  }

  clearUserData() {
    this.authenticatedUser(false);
    this.clearToken();
    localStorage.clear();
    sessionStorage.clear();
  }

  // Configurações para o Token
  checkToken() {
    return Promise.resolve(true);
  }
  setToken(token: string) {
    localStorage.setItem('token', token)
    this.token = token
  }

  get getToken() {
    this.token = localStorage.getItem('token');
    return this.token;
  }

  clearToken() {
    this.token = null;
    this.user = null;
  }
}
