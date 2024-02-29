import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { HttpClient } from "@angular/common/http";
import { UserModel } from "../models/user.model";

@Injectable({ providedIn: 'root' })

export class UserIncomeService {

  private readonly baseUrl = environment['endPoint'];

  constructor(private httpClient: HttpClient) { }

  addUserIncome(email: string, password: string) {
    return this.httpClient.put<any>(`${this.baseUrl}/addUserIncome`, { email, password })
  }

  updateUserIncome(id: string, email: string, password: string) {
    return this.httpClient.put<any>(`${this.baseUrl}/updateUserIncome/${id}`, { email, password });
  }

  deleteUserIncome(id: string) {
    return this.httpClient.delete<any>(`${this.baseUrl}/deleteUserIncome/${id}`)
  }

  userList() {
    return this.httpClient.get<Array<UserModel>>(`${this.baseUrl}/userList`)
  }
}
