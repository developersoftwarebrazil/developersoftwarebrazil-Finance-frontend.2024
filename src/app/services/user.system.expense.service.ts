import { HttpClient } from "@angular/common/http";
import { environment } from "../../environment";
import { SystemExpenseModel } from "../models/expense.system.model";

export class UserSystemExpenseService {

  private readonly baseUrl = environment["endPoint"];

  constructor(private httpClient: HttpClient) { }

  //Usuário para o sistema de despesa
  RegisterUserOnSystemExpense(userSystemExpenseId: number, userEmail: string) {
    return this.httpClient.post<SystemExpenseModel>(`${this.baseUrl}/RegisterUserExpenseOnSystem?userSystemExpenseId=${userSystemExpenseId}&userEmail=${userEmail}`, null);
  }

  UserSystemExpenseList(userExpenseId: number) {
    return this.httpClient.get(`${this.baseUrl}/UserSystemExpenseList?userExpenseId=${userExpenseId}`);
  }

  DeleteUserOnSystemExpense(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/DeleteUserOnSystemExpense?id=${id}`);
  }

}
