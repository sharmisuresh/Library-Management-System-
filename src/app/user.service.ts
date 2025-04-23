import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  register(user: any): Observable<any> {
    return this.http.post('http://localhost:8084/library/register',user,{responseType:'text'});
  }

  login(credentials:any): Observable<any> {
    return this.http.post('http://localhost:8084/library/login',credentials,{responseType:'text'} );
  }

}
