import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-returnbook',
  standalone: false,
  templateUrl: './returnbook.component.html',
  styleUrl: './returnbook.component.css'
})
export class ReturnbookComponent implements OnInit {
  borrowedBooks: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBorrowedBooks();
  }

  loadBorrowedBooks(): void {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      alert('User not logged in.');
      return;
    }

    this.bookService.getUserIdByEmail(userEmail).subscribe({
      next: (userId) => {
        this.bookService.getBorrowedBooks(userId).subscribe({
          next: (books) => {
            this.borrowedBooks = books.filter(book => book.returnDate == null);

          },
          error: (err) => {
            console.error('Error fetching borrowed books:', err);
            alert('Error fetching borrowed books.');
          }
        });
      },
      error: (err) => {
        console.error('Error fetching user ID:', err);
        alert('Error fetching user ID.');
      }
    });
  }

  returnBook(bookId: number): void {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      alert('User not logged in.');
      return;
    }

    this.bookService.getUserIdByEmail(userEmail).subscribe({
      next: (userId) => {
        this.bookService.returnBook(userId, bookId).subscribe({
          next: (res) => {
            alert(res); // e.g. "Book returned with fine: ₹6230"
            this.loadBorrowedBooks(); // refresh the list
          },
          error: (err) => {
            console.error('Error returning book:', err);
            alert('Failed to return book.');
          }
        });
      },
      error: (err) => {
        console.error('Error getting user ID:', err);
      }
    });
  }

}
