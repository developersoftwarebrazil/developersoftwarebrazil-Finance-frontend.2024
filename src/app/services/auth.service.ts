import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class AuthService {
  private authenticatedUserWeb: boolean = false;
  private token: any;
  private user: any;

  constructor(private httpClient: HttpClient) { }

  checkToken() {
    return Promise.resolve(true);
  }

  authenticatedUser(status: boolean) {
    localStorage.setItem('authenticatedUserWeb', JSON.stringify(status));
    return this.authenticatedUserWeb = status
  }

  userIsAuthenticated(): Promise<boolean> {
    this.authenticatedUserWeb = localStorage.getItem('authenticatedUserWeb') == 'true';
    return Promise.resolve(this.authenticatedUserWeb);
  }

  setToken(tolen: string) {
    localStorage.setItem('token', this.token)
    this.token = this.token
  }

  get getToken() {
    this.token = localStorage.getItem('token');
    return this.token;
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

  clearToken() {
    this.token = null;
    this.user = null;
  }

  clearUserData() {
    this.authenticatedUser(false);
    this.clearToken();
    localStorage.clear();
    sessionStorage.clear();
  }
}
