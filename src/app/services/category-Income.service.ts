import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { CategoryIncomeModel } from "../models/category-income.model";

@Injectable({ providedIn: 'root' })


export class CategoryIncomeService {

  private readonly baseUrl = environment['endPoint'];
  constructor(private httpClient: HttpClient) { }

  //Despense
  AddCategoryIncome(categoryIncome: CategoryIncomeModel) {
    return this.httpClient.post<CategoryIncomeModel>(`${this.baseUrl}/AddCategoryIncome`, categoryIncome);
  }

  CategoryUserIncomeList(userEmail: string) {
    return this.httpClient.get(`${this.baseUrl}/CategoryUserIncomeList?userEmail=${userEmail}`);
  }

  GetCategory(id: number) {
    return this.httpClient.get(`${this.baseUrl}/GetCategory?id=${id}`);
  }

  UpdateCategory(category: CategoryIncomeModel) {
    return this.httpClient.put<CategoryIncomeModel>(`${this.baseUrl}/UpdateCategory`, category)
  }

}
