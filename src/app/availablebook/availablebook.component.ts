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
        this.books = res;
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      }
    });
  }
}
