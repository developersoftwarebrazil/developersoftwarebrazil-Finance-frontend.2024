
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { IncomeSystemModel } from "../models/income.system.model";


@Injectable({ providedIn: 'root' })

export class IncomeSystemService {

  private readonly baseUrl = environment['endPoint'];
  constructor(private httpClient: HttpClient) { }

  //Investiemnto
  AddSystemIncome(systemIncome: IncomeSystemModel) {
    return this.httpClient.post<IncomeSystemModel>(`${this.baseUrl}/AddSystemIncome`, systemIncome);
  }

  SystemUserIncomeList(userEmail: string) {
    return this.httpClient.get(`${this.baseUrl}/SystemUserIncomeList?userEmail=${userEmail}`);
  }

  GetSystemIncome(id: number) {
    return this.httpClient.get(`${this.baseUrl}/GetSystemIncome?id=${id}`);
  }
  UpdateSystemIncome(systemIncome: IncomeSystemModel) {
    return this.httpClient.put<IncomeSystemModel>(`${this.baseUrl}/UpdateSystemIncome`, systemIncome)
  }

  //Usuário do sistema para investimento
  RegisterUserOnSystemIncome(userSystemIncomeId: number, userEmail: string) {
    return this.httpClient.post<any>(`${this.baseUrl}/RegisterUserOnSystemIncome?userSystemIncomeId=${userSystemIncomeId}&userEmail=${userEmail}`, null)
  }

}
