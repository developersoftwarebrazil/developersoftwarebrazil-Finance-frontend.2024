import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { CategoryExpenseModel } from "../models/category-expense.model";

@Injectable({ providedIn: 'root' })

export class CategoryExpenseService {

  private readonly baseUrl = environment['endPoint'];
  constructor(private httpClient: HttpClient) { }

  //Despense
  AddCategory(category: CategoryExpenseModel) {
    return this.httpClient.post<CategoryExpenseModel>(`${this.baseUrl}/AddCategory`, category);
  }

  CategoryUserExpenseList(userEmail: string) {
    return this.httpClient.get(`${this.baseUrl}/CategoryUserExpenseList?userEmail=${userEmail}`);
  }

  GetCategory(id: number) {
    return this.httpClient.get(`${this.baseUrl}/GetCategory?id=${id}`);
  }

  UpdateCategory(category: CategoryExpenseModel) {
    return this.httpClient.put<CategoryExpenseModel>(`${this.baseUrl}/UpdateCategory`, category)
  }

}
