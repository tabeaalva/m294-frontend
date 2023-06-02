import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';
import { Place } from '../data/place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private entityUrl = "place";
  constructor(
    private http:HttpClient
  ) {}
    public getList () : Observable<Place[]> {
      return this.http.get<Place[]>(environment.backendBaseUrl + this.entityUrl)
    }
    public getOne (id: number) : Observable<Place> {
      return this.http.get<Place>(environment.backendBaseUrl + this.entityUrl + `/${id}`)
    }
    public update(place: Place): Observable<Place> {
      return this.http.put<Place>(environment.backendBaseUrl + this.entityUrl + `/${place.id}`, place);
    }

    public save(place: Place): Observable<Place> {
      return this.http.post<Place>(environment.backendBaseUrl + this.entityUrl, place);
    }

    public delete(id: number): Observable<HttpResponse<string>> {
      return this.http.delete<string>(environment.backendBaseUrl + this.entityUrl + `/${id}`, {observe: 'response'});
    }
}
