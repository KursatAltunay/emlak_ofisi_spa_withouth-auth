import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Advert } from '../models/advert';
import { Observable } from 'rxjs';
import { Agent } from '../models/agent';
import { LoginAgent } from '../models/loginAgent';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  constructor(private httpClient: HttpClient) {}

  path = 'https://localhost:44393/api/agent';
  json;
   _agent
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getAdverts(): Observable<Advert[]> {
    return this.httpClient.get<Advert[]>(this.path + '?id=1'); //burası ayarlanacak
  }

  getAdvertById(advertId): Observable<Advert> {
    return this.httpClient.get<Advert>(
      this.path + '/advertDetail/?id=' + advertId
    );
  }

  addAdvert(advert: Advert) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token',
      }),
    };
    this.httpClient
      .post(this.path + '/advertAdd', advert, httpOptions)
      .subscribe();
  }

  updateAdvert(advert: Advert) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token',
      }),
    };
    this.httpClient
      .post(this.path + '/advertUpdate/' + advert.id, advert, httpOptions)
      .subscribe();
  }

  deleteAdvert(id: number) {
    console.log(id);
    this.httpClient.delete(this.path + '/advertDelete/' + id).subscribe();
  }

  addAgent(agent: Agent) {
    this.httpClient.post(this.path + '/addAgent', agent).subscribe();
  }

  login(loginAgent: LoginAgent) {
    this.httpClient
      .post(this.path + '/login', loginAgent)
      .toPromise()
      .then((data: any) => {
        console.log(data);
       this._agent =JSON.parse(data);  
      });
      console.log(this._agent);      

  }

  loggedIn() {

  }

  logOut() {}
}
