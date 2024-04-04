import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { ExpenseSystemModel } from "../models/expense.system.model";

@Injectable({ providedIn: 'root' })

export class ExpenseSystemService {

  private readonly baseUrl = environment["endPoint"];
  constructor(private httpClient: HttpClient) { }

  //Despense
  AddSystemExpense(expenseSystemExpense: ExpenseSystemModel) {
    return this.httpClient.post<ExpenseSystemModel>(`${this.baseUrl}/AddSystemExpense`, expenseSystemExpense);
  }

  SystemExpenseUserList(userEmail: string) {
    return this.httpClient.get(`${this.baseUrl}/SystemExpenseUserList?userEmail=${userEmail}`);
  }
//GetExpenseSystem
  GetExpenseSystem(id: number) {
    return this.httpClient.get(`${this.baseUrl}/GetExpenseSystem?id=${id}`);
  }

  UpdateSystemExpense(expenseSystemExpense: ExpenseSystemModel) {
    return this.httpClient.put<ExpenseSystemModel>(`${this.baseUrl}/UpdateSystemExpense`, expenseSystemExpense)
  }

  GenerateSystemExpenseCopy() {
    return this.httpClient.post<any>(`${this.baseUrl}/GenerateSystemExpenseCopy`, null)
  }

  //Usuário do sistema para despesas
  RegisterUserOnSystemExpense(userSystemExpenseId: number, userEmail: string) {
    return this.httpClient.post<any>(`${this.baseUrl}/RegisterUserOnSystemExpense?userSystemExpenseId=${userSystemExpenseId}&userEmail=${userEmail}`, null);
  }

}
