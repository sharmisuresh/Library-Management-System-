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

  getUserInfo(): Observable<any> {
    // You can replace this with the actual API endpoint for fetching user data
    return this.http.get<any>('http://localhost:8084/library/user-info');
  }

  getUserByEmail(email: string) {
    return this.http.get<any>(`http://localhost:8084/library/getUserByEmail/${email}`);
  }
  getIssuedBooksByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8084/library/issuedBooks/${userId}`);
  }
}
