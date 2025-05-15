import { HttpClient, HttpParams } from '@angular/common/http';
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

  googleLogin(email: string, name: string): Observable<string> {
    return this.http.post('http://localhost:8084/library/google-login', { email, name }, { responseType: 'text' });
  }

// in user.service.ts
getAllUsers(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:8084/library/users');
}

deleteUser(userId: number): Observable<string> {
  return this.http.delete(
    `http://localhost:8084/library/users/${userId}`,
    { responseType: 'text' }
  );
}

  forgotPassword(email: string, newPassword: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('newPassword', newPassword);

    return this.http.post(`http://localhost:8084/library/forgot-password`, null, { params, responseType: 'text' });
  }


}
