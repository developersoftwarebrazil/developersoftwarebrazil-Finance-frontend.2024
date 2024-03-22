import { HttpClient } from "@angular/common/http";
import { environment } from "../../environment";
import { IncomeSystemModel } from "../models/income.system.model";


export class UserSystemIncomeService {

  private readonly baseUrl = environment["endPoint"];

  constructor(private httpClient: HttpClient) { }

  //Usuário para o sistema de investimento
  RegisterUserOnSystemIncome(userSystemIncomeId: number, userEmail: string) {
    return this.httpClient.post<IncomeSystemModel>(`${this.baseUrl}/RegisterUserExpenseOnSystem?userSystemIncomeId=${userSystemIncomeId}&userEmail=${userEmail}`, null);
  }

  UserSystemIncomeList(userIncomeId: number) {
    return this.httpClient.get(`${this.baseUrl}/UserSystemIncomeList?userIncomeId=${userIncomeId}`);
  }

  DeleteUserOnSystemIncome(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/DeleteUserOnSystemIncome?id=${id}`);
  }




}
