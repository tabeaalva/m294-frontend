import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../data/member';
import { environment } from '../enviroments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private entityUrl = "member";
  constructor(
    private http:HttpClient
  ) {}
    public getList () : Observable<Member[]> {
      return this.http.get<Member[]>(environment.backendBaseUrl + this.entityUrl)
    }
    public getOne (id: number) : Observable<Member> {
      return this.http.get<Member>(environment.backendBaseUrl + this.entityUrl + `/${id}`)
    }
    public update(member: Member): Observable<Member> {
      return this.http.put<Member>(environment.backendBaseUrl + this.entityUrl + `/${member.id}`, Member);
    }

    public save(member: Member): Observable<Member> {
      return this.http.post<Member>(environment.backendBaseUrl + this.entityUrl, Member);
    }

    public delete(id: number): Observable<HttpResponse<string>> {
      return this.http.delete<string>(environment.backendBaseUrl + this.entityUrl + `/${id}`, {observe: 'response'});
    }
}
