import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { ExpenseSystemModel } from "../models/expense.system.model";


@Injectable({ providedIn: 'root' })

export class UserSystemExpenseService {

  private readonly baseUrl = environment["endPoint"];
  constructor(private httpClient: HttpClient) { }


  //Usuário para o sistema de despesa
  RegisterUserOnSystemExpense(userSystemExpenseId: number, userEmail: string) {
    return this.httpClient.post<ExpenseSystemModel>(`${this.baseUrl}/RegisterUserExpenseOnSystem?userSystemExpenseId=${userSystemExpenseId}&userEmail=${userEmail}`, null);
  }

  UserSystemExpenseList(userSystemExpenseId: number) {
    return this.httpClient.get(`${this.baseUrl}/UserSystemExpenseList?userSystemExpenseId=${userSystemExpenseId}`);
  }

  DeleteUserOnSystemExpense(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/DeleteUserOnSystemExpense?id=${id}`);
  }


}
