import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { SystemExpenseModel } from "../models/system.expense.model";

@Injectable({ providedIn: 'root' })

export class SystemExpenseService {

  private readonly baseUrl = environment['endPoint'];
  constructor(private httpClient: HttpClient) { }

  //Despense
  AddSystemExpense(systemExpense: SystemExpenseModel) {
    return this.httpClient.post<SystemExpenseModel>(`${this.baseUrl}/AddSystemExpense`, systemExpense);
  }

  SystemExpenseUserList(userEmail: string) {
    return this.httpClient.get(`${this.baseUrl}/SystemExpenseUserList?userEmail=${userEmail}`);
  }

  GetSystemExpense(id: number) {
    return this.httpClient.get(`${this.baseUrl}/GetSystemExpense?id=${id}`);
  }

  UpdateSystemExpense(systemExpense: SystemExpenseModel) {
    return this.httpClient.put<SystemExpenseModel>(`${this.baseUrl}/UpdateSystemExpense`, systemExpense)
  }

  GenerateSystemExpenseCopy() {
    return this.httpClient.post<any>(`${this.baseUrl}/GenerateSystemExpenseCopy`, null)
  }

  //Usuário do sistema para despesas
  RegisterUserOnSystemExpense(userSystemExpenseId: number, userEmail: string) {
    return this.httpClient.post<any>(`${this.baseUrl}/RegisterUserOnSystemExpense?userSystemExpenseId=${userSystemExpenseId}&userEmail=${userEmail}`, null);
  }

}
