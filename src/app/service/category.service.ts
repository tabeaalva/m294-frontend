import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../data/category';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private entityUrl = "category";
  constructor(
    private http:HttpClient
  ) {}
    public getList () : Observable<Category[]> {
      return this.http.get<Category[]>(environment.backendBaseUrl + this.entityUrl)
    }
    public getOne (id: number) : Observable<Category> {
      return this.http.get<Category>(environment.backendBaseUrl + this.entityUrl + `/${id}`)
    }
    public update(category: Category): Observable<Category> {
      return this.http.put<Category>(environment.backendBaseUrl + this.entityUrl + `/${category.id}`, Category);
    }

    public save(category: Category): Observable<Category> {
      return this.http.post<Category>(environment.backendBaseUrl + this.entityUrl, Category);
    }

    public delete(id: number): Observable<HttpResponse<string>> {
      return this.http.delete<string>(environment.backendBaseUrl + this.entityUrl + `/${id}`, {observe: 'response'});
    }
}
