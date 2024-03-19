import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { ExpenseSystemModel } from "../models/expense.system.model";

@Injectable({ providedIn: 'root' })

export class ExpenseSystemService {

  private readonly baseUrl = environment["endPoint"];
  constructor(private httpClient: HttpClient) { }

  //Despense
  AddSystemExpense(expenseSystem: ExpenseSystemModel) {
    return this.httpClient.post<ExpenseSystemModel>(`${this.baseUrl}/AddSystemExpense`, expenseSystem);
  }

  SystemExpenseUserList(userEmail: string) {
    return this.httpClient.get(`${this.baseUrl}/SystemExpenseUserList?userEmail=${userEmail}`);
  }

  GetSystemExpense(id: number) {
    return this.httpClient.get(`${this.baseUrl}/GetSystemExpense?id=${id}`);
  }

  UpdateSystemExpense(expenseSystem: ExpenseSystemModel) {
    return this.httpClient.put<ExpenseSystemModel>(`${this.baseUrl}/UpdateSystemExpense`, expenseSystem)
  }

  GenerateSystemExpenseCopy() {
    return this.httpClient.post<any>(`${this.baseUrl}/GenerateSystemExpenseCopy`, null)
  }

  //Usuário do sistema para despesas
  RegisterUserOnSystemExpense(userSystemExpenseId: number, userEmail: string) {
    return this.httpClient.post<any>(`${this.baseUrl}/RegisterUserOnSystemExpense?userSystemExpenseId=${userSystemExpenseId}&userEmail=${userEmail}`, null);
  }

}
