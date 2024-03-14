import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})

export class UserExpenseService {

  private readonly baseUrl = environment['endPoint'];

  constructor(private httpClient: HttpClient) { }

  addUserExpense(email: string, password: string) {
    return this.httpClient.put<any>(`${this.baseUrl}/addUserExpense`, { email, password })
  }

  updateUserExpense(id: string, email: string, password: string) {
    return this.httpClient.put<any>(`${this.baseUrl}/updateUserExpense/${id}`, { email, password });
  }

  deleteUserExpense(id: string) {
    return this.httpClient.delete<any>(`${this.baseUrl}/deleteUserExpense/${id}`)
  }

}
