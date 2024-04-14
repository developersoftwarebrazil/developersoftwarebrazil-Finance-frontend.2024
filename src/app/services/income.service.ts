import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { IncomeModel } from "../models/income.model";

@Injectable({ providedIn: 'root' })

export class IncomeService {

  private readonly baseUrl = environment['endPoint'];
  constructor(private httpClient: HttpClient) { }

  //Despense
  AddIncome(income: IncomeModel) {
    return this.httpClient.post<IncomeModel>(`${this.baseUrl}/AddIncome`, income);
  }
  IncomeUserList(userEmail: string){
    return  this.httpClient.get(`${this.baseUrl}/IncomeUserList?userEmail=${userEmail}`);
  }
  GetIncome(id: number) {
    return this.httpClient.get(`${this.baseUrl}/GetIncome?id=${id}`);
  }
  UpdateIncome(income: IncomeModel) {
    return this.httpClient.put<IncomeModel>(`${this.baseUrl}/UpdateIncome`, income)
  }
  LoadGraph(userEmail: string){
    return this.httpClient.get(`${this.baseUrl}/LoadGraph?userEmail=${userEmail}`);
  }

}
