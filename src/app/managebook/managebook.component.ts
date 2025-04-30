import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-managebook',
  standalone: false,
  templateUrl: './managebook.component.html',
  styleUrl: './managebook.component.css'
})
export class ManagebookComponent implements OnInit {
  books: any[] = [];
  bookForm!: FormGroup;
  showAddForm: boolean = false;
  keyword: string = '';

  constructor(private bookService: BookService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: [''],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', Validators.required],
    });

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

  addBook(): void {
    if (this.bookForm.invalid){
      this.bookForm.markAllAsTouched(); // 👈 Add this line
    alert('Please correct the errors before submitting.');
      return;
    }

    const newBook = this.bookForm.value;

    this.bookService.addBook(newBook).subscribe({
      next: () => {
        alert('Book added successfully!');
        this.bookForm.reset();
        this.getAllBooks(); // refresh list
      },
      error: (err) => {
        alert('Error adding book!');
        console.error(err);
      }
    });
  }

  editingBookId: number | null = null;

editBook(book: any): void {
  this.editingBookId = book.id;
  this.bookForm.patchValue({
    title: book.title,
    author: book.author,
    genre: book.genre,
    quantity: book.quantity,
    price: book.price,
  });
  this.showAddForm = true; // show the form
}

updateBook(): void {
  if (this.bookForm.invalid || this.editingBookId === null) return;

  const updatedBook = this.bookForm.value;

  this.bookService.updateBook(this.editingBookId, updatedBook).subscribe({
    next: () => {
      alert('Book updated successfully!');
      this.editingBookId = null;
      this.bookForm.reset();
      this.showAddForm = false;
      this.getAllBooks(); // refresh list
    },
    error: (err) => {
      alert('Error updating book!');
      console.error(err);
    }
  });
}
cancelEdit() {
  this.editingBookId = null;
  this.bookForm.reset();
  this.showAddForm = false;
}


  deleteBook(id: number): void {
    if (!confirm('Are you sure you want to delete this book?')) return;

    this.bookService.deleteBook(id).subscribe({
      next: () => {
        alert('Book deleted!');
        this.getAllBooks(); // refresh
      },
      error: (err) => {
        alert('Error deleting book.');
        console.error(err);
      }
    });
  }
}
