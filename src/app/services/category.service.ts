import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { CategoryModel } from "../models/category.model";

@Injectable({ providedIn: 'root' })

export class CategoryService {

  private readonly baseUrl = environment['endPoint'];
  constructor(private httpClient: HttpClient) { }

  //Despense
  AddCategory(category: CategoryModel) {
    return this.httpClient.post<CategoryModel>(`${this.baseUrl}/AddCategory`, category);
  }

  SystemExpenseUserList(userEmail: string) {
    return this.httpClient.get(`${this.baseUrl}/SystemExpenseUserList?userEmail=${userEmail}`);
  }

  GetCategory(id: number) {
    return this.httpClient.get(`${this.baseUrl}/GetCategory?id=${id}`);
  }

  UpdateCategory(category: CategoryModel) {
    return this.httpClient.put<CategoryModel>(`${this.baseUrl}/UpdateCategory`, category)
  }

}
