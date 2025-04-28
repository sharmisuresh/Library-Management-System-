import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }
  getBooks(): Observable<any> {
    return this.http.get('http://localhost:8084/books/all');
  }

  addBook(book: any): Observable<any> {
    return this.http.post('http://localhost:8084/books/add?role=admin', book, { responseType: 'text' });
  }


  deleteBook(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8084/books/delete/${id}?role=admin`, { responseType: 'text' });
  }


  updateBook(bookId: number, book: any): Observable<any> {
    return this.http.put(`http://localhost:8084/books/update/${bookId}?role=admin`, book, { responseType: 'text' });
  }


}
