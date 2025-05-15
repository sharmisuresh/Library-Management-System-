import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BookrequestService {

  private baseUrl = 'http://localhost:8084/bookrequests';

  constructor(private http: HttpClient) { }

  requestBook(request: any): Observable<string> {
    return this.http.post(`${this.baseUrl}/request`, request, { responseType: 'text' });
  }


  getAllRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }


  approveRequest(requestId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/approve/${requestId}`, {}, {
      responseType: 'text' as 'json'
    });
  }




}
