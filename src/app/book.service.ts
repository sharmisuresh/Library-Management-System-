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
  searchBooks(keyword: string): Observable<any[]> {
    return this.http.post<any[]>(`http://localhost:8084/books/search`, keyword);
  }


  deleteBook(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8084/books/delete/${id}?role=admin`, { responseType: 'text' });
  }


  updateBook(bookId: number, book: any): Observable<any> {
    return this.http.put(`http://localhost:8084/books/update/${bookId}?role=admin`, book, { responseType: 'text' });
  }
  borrowBook(userId: number, bookId: number): Observable<string> {
    const url = `http://localhost:8084/issue/book?userId=${userId}&bookId=${bookId}`;
    return this.http.post(url, null, { responseType: 'text' });
  }

  getUserIdByEmail(email: string): Observable<number> {
    return this.http.get<number>(`http://localhost:8084/library/user/id?email=${email}`);
  }


}
