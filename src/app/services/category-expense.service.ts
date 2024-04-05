import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { CategoryExpenseModel } from "../models/category-expense.model";

@Injectable({ providedIn: 'root' })

export class CategoryExpenseService {

  private readonly baseUrl = environment['endPoint'];
  constructor(private httpClient: HttpClient) { }

  //Despense
  AddCategoryExpense(categoryExpense: CategoryExpenseModel) {
    return this.httpClient.post<CategoryExpenseModel>(`${this.baseUrl}/AddCategoryExpense`, categoryExpense);
  }

  CategoryUserExpenseList(userEmail: string) {
    return this.httpClient.get(`${this.baseUrl}/CategoryUserExpenseList?userEmail=${userEmail}`);
  }

  GetCategoryExpense(id: number) {
    return this.httpClient.get(`${this.baseUrl}/GetCategoryExpense?id=${id}`);
  }

  UpdateCategoryExpense(categoryExpense: CategoryExpenseModel) {
    return this.httpClient.put<CategoryExpenseModel>(`${this.baseUrl}/UpdateCategoryExpense`, categoryExpense)
  }

}
