import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-availablebook',
  standalone: false,
  templateUrl: './availablebook.component.html',
  styleUrl: './availablebook.component.css'
})
export class AvailablebookComponent implements OnInit{
  books: any[] = [];
  keyword: string = '';
   constructor(private bookService: BookService) {}
  ngOnInit(): void {
    this.getAllBooks();
  }
  onSearch(): void {
    if (this.keyword.trim() === '') {
      this.getAllBooks(); // If search is empty, show all books
      return;
    }

    this.bookService.searchBooks(this.keyword).subscribe({
      next: (res) => {
        // Ensure response is an array before assigning
        this.books = Array.isArray(res) ? res : [];
      },
      error: (err) => {
        alert('Error searching books!');
        console.error(err);
        this.books = []; // Ensure no invalid data
      }
    });
  }


  getAllBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (res) => {
        this.books = res.filter((book: any) => book.quantity > 0);
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      }
    });
  }
  borrowBook(bookId: number): void {
    const userEmail = localStorage.getItem('userEmail');

    if (!userEmail) {
      alert('User not logged in.');
      return;
    }

    // You should ideally get the userId from backend. For now, use a fixed ID or fetch it.
    this.bookService.getUserIdByEmail(userEmail).subscribe({
      next: (userId: number) => {
        this.bookService.borrowBook(userId, bookId).subscribe({
          next: (res: string) => {
            alert(res);
            this.getAllBooks(); // Refresh list to hide book if quantity is 0
          },
          error: (err) => {
            console.error('Borrow error:', err);
            alert('Failed to borrow book');
          }
        });
      },
      error: (err) => {
        console.error('User fetch error:', err);
        alert('Could not get user ID');
      }
    });
  }

}
