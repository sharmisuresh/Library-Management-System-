import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

private baseUrl = 'http://localhost:8084/library';
  constructor(private http: HttpClient) { }
  getBooks(): Observable<any> {
    return this.http.get(`${this.baseUrl}/books`);
  }

  addBook(book: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/books`, book);
  }

  deleteBook(bookId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/books/${bookId}`);
  }
  updateBook(bookId: number, book: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${bookId}`, book);
  }

}
