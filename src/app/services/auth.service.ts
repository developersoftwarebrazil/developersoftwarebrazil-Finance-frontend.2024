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

  autehenticatedUser(status: boolean) {
    localStorage.setItem('authenticatedUserWeb', JSON.stringify(status));
    return this.authenticatedUserWeb = status
  }

  isUserAuthenticated(): Promise<boolean> {
    this.authenticatedUserWeb = localStorage.getItem('authenticatedUserWeb') == 'true';
    return Promise.resolve(this.authenticatedUserWeb);
  }

  setToken(tolen: string) {
    localStorage.setItem('token', this.token)
    this.token = this.token
  }

  get getTolen() {
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
    this.autehenticatedUser(false);
    this.clearToken();
    localStorage.clear();
    sessionStorage.clear();
  }
}
