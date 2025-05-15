import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportserviceService {
  private baseUrl = 'http://localhost:8084';  // Base URL of your Spring Boot backend

  constructor(private http: HttpClient) {}

  getIssuedBooksReports(role: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/issued-books?role=${role}`);
  }

  
}
