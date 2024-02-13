import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  // variáveis
  private readonly baseUrl = environment['endPoint'];

  // construtor da classe
  constructor(
    private httpClient: HttpClient
  ) { }

  // métodos

  login(Email: string, Password: string) {
    return this.httpClient.post<any>(`${this.baseUrl}/CreateToken`, {Email: Email, Password: Password});
  }

}
