import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { ExpenseModel } from "../models/expense.model";

@Injectable({ providedIn: 'root' })

export class ExpenseService {

  private readonly baseUrl = environment['endPoint'];
  constructor(private httpClient: HttpClient) { }

  //Despense
  AddExpense(expense: ExpenseModel) {
    return this.httpClient.post<ExpenseModel>(`${this.baseUrl}/AddExpense`, expense);
  }

}
