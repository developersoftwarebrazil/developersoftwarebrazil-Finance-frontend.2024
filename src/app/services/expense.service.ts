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

  ExpenseUserList(userEmail:string)
  {
      return  this.httpClient.get(`${this.baseUrl}/ExpenseUserList?userEmail=${userEmail}`);
  }
  GetExpense(id: number) {
    return this.httpClient.get(`${this.baseUrl}/GetExpense?id=${id}`);
  }
  UpdateExpense(expense: ExpenseModel) {
    return this.httpClient.put<ExpenseModel>(`${this.baseUrl}/UpdateExpense`, expense)
  }

}
