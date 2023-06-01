import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Event } from '../data/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private entityUrl = "event";
  constructor(
    private http:HttpClient
  ) {}
    public getList () : Observable<Event[]> {
      return this.http.get<Event[]>(environment.backendBaseUrl + this.entityUrl)
    }
    public getOne (id: number) : Observable<Event> {
      return this.http.get<Event>(environment.backendBaseUrl + this.entityUrl + `/${id}`)
    }
    public update(event: Event): Observable<Event> {
      return this.http.put<Event>(environment.backendBaseUrl + this.entityUrl + `/${event.id}`, Event);
    }

    public save(event: Event): Observable<Event> {
      return this.http.post<Event>(environment.backendBaseUrl + this.entityUrl, Event);
    }

    public delete(id: number): Observable<HttpResponse<string>> {
      return this.http.delete<string>(environment.backendBaseUrl + this.entityUrl + `/${id}`, {observe: 'response'});
    }
}
