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

}
