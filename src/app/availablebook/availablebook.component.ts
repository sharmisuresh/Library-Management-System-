import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-availablebook',
  standalone: false,
  templateUrl: './availablebook.component.html',
  styleUrl: './availablebook.component.css'
})
export class AvailablebookComponent implements OnInit{
  books: any[] = [];
  keyword: string = '';
  displayedBooks: any[] = []; // books shown on current page
pageSize = 5;             // books per page
currentPage = 1;
totalPages = 0;

   constructor(private bookService: BookService, private toastr: ToastrService) {}
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
        this.toastr.error('Error searching books!');

        console.error(err);
        this.books = []; // Ensure no invalid data
      }
    });
  }


  getAllBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (res) => {
        this.books = res.filter((book: any) => book.quantity > 0);
         this.totalPages = Math.ceil(this.books.length / this.pageSize);
      this.updateDisplayedBooks();
      },
      error: (err) => {
        console.error('Error fetching books:', err);
        this.toastr.error('Error fetching books!');
      }
    });
  }
  updateDisplayedBooks(): void {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.displayedBooks = this.books.slice(startIndex, endIndex);
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updateDisplayedBooks();
  }
}

prevPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updateDisplayedBooks();
  }
}
  borrowBook(bookId: number): void {
    const userEmail = localStorage.getItem('userEmail');

    if (!userEmail) {
      this.toastr.warning('User not logged in.');

      return;
    }

    // You should ideally get the userId from backend. For now, use a fixed ID or fetch it.
    this.bookService.getUserIdByEmail(userEmail).subscribe({
      next: (userId: number) => {
        this.bookService.borrowBook(userId, bookId).subscribe({
          next: (res: string) => {
             this.toastr.success(res, 'Success');
            this.getAllBooks(); // Refresh list to hide book if quantity is 0
          },
          error: (err) => {
            console.error('Borrow error:', err);
            this.toastr.error('Failed to borrow book');

          }
        });
      },
      error: (err) => {
        console.error('User fetch error:', err);
        this.toastr.error('Could not get user ID');

      }
    });
  }

}
