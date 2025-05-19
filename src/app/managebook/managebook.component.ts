import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-managebook',
  standalone: false,
  templateUrl: './managebook.component.html',
  styleUrl: './managebook.component.css'
})
export class ManagebookComponent implements OnInit {
  books: any[] = [];
  isFilterApplied = false;
   filteredBooks: any[] = [];
  bookForm!: FormGroup;
  showAddForm: boolean = false;
  keyword: string = '';
   showFilter = false;
    bookName: string = '';
    genre: string = '';
  displayedBooks: any[] = []; // books shown on current page
pageSize = 5;             // books per page
currentPage = 1;
totalPages = 0;
genres: string[] = [];



  constructor(private bookService: BookService, private fb: FormBuilder,  private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['',[Validators.required, Validators.maxLength(20)]],
      author: ['', Validators.required],
      genre: [''],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', Validators.required],
    });

    this.getAllBooks();
  }
onSearch(): void {
  this.bookName = '';
  this.genre = '';
  this.showFilter = false;

  if (this.keyword.trim() === '') {
    this.getAllBooks();
    return;
  }

  this.bookService.searchBooks(this.keyword).subscribe({
    next: (res) => {
      this.books = Array.isArray(res) ? res : [];
      this.totalPages = Math.ceil(this.books.length / this.pageSize);
      this.currentPage = 1;
      this.updateDisplayedBooks();
    },
    error: (err) => {
      this.toastr.error('Error searching books!');

      console.error(err);
      this.books = [];
      this.updateDisplayedBooks();
    }
  });
}

    toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }


 applyFilter(): void {
  const nameFilter = this.bookName.trim().toLowerCase();
  const genreFilter = this.genre.trim().toLowerCase();

  const filtered = this.books.filter(book =>
    (!nameFilter || book.title.toLowerCase().includes(nameFilter)) &&
    (!genreFilter || book.genre?.toLowerCase().includes(genreFilter))
  );

  this.displayedBooks = filtered.slice(0, this.pageSize); // show first page
  this.totalPages = Math.ceil(filtered.length / this.pageSize);
  this.currentPage = 1;
  this.filteredBooks = filtered; // store filtered result for pagination
  this.isFilterApplied = true;
  this.showFilter = false;
}


cancelFilter(): void {
  this.showFilter = false;
  this.bookName = '';
  this.genre = '';
  this.isFilterApplied = false;
  this.filteredBooks = [];
  this.totalPages = Math.ceil(this.books.length / this.pageSize);
  this.currentPage = 1;
  this.updateDisplayedBooks();
}





 getAllBooks(): void {
  this.bookService.getBooks().subscribe({
    next: (res) => {
      this.books = res.filter((book: any) => book.quantity > 0);

         const genreSet = new Set<string>();
      this.books.forEach(book => {
        if (book.genre) {
          genreSet.add(book.genre);
        }
      });
      this.genres = Array.from(genreSet);
      this.totalPages = Math.ceil(this.books.length / this.pageSize);
      this.currentPage = 1;
      this.updateDisplayedBooks();
    },
    error: (err) => {
      console.error('Error fetching books:', err);
    }
  });
}

updateDisplayedBooks(): void {
  const list = this.isFilterApplied ? this.filteredBooks : this.books;
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.displayedBooks = list.slice(startIndex, endIndex);
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
  addBook(): void {
    if (this.bookForm.invalid){
      this.bookForm.markAllAsTouched(); // 👈 Add this line
    this.toastr.success('Please correct the errors before submitting.');

      return;
    }

    const newBook = this.bookForm.value;

    this.bookService.addBook(newBook).subscribe({
      next: () => {
        this.toastr.success('Book added successfully!');

        this.bookForm.reset();
        this.getAllBooks(); // refresh list
      },
      error: (err) => {
        this.toastr.error('Error adding book!');

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
  this.showAddForm = true;

}


updateBook(): void {
  if (this.bookForm.invalid || this.editingBookId === null) return;
  const updatedBook = { ...this.bookForm.value, id: this.editingBookId };

  this.bookService.updateBook(this.editingBookId, updatedBook).subscribe({
    next: () => {
      this.toastr.success('Book updated successfully!');

      this.editingBookId = null;
      this.bookForm.reset();
      this.showAddForm = false;
      this.getAllBooks(); // refresh list
    },
    error: (err) => {
      this.toastr.error('Error updating book!');

      console.error(err);
    }
  });
}
cancelEdit() {
  this.editingBookId = null;
  this.bookForm.reset();
  this.showAddForm = false;
}


//   deleteBook(id: number): void {
//     if (!confirm('Are you sure you want to delete this book?')) return;

//     this.bookService.deleteBook(id).subscribe({
//       next: () => {
//         this.toastr.success('Book deleted!');

//         this.getAllBooks(); // refresh
//       },
//       error: (err) => {
//         this.toastr.success('Error deleting book.');

//         console.error(err);
//       }
//     });
//   }

deleteBook(id: number): void {
  if (!confirm('Are you sure you want to delete this book?')) return;

  this.bookService.deleteBook(id).subscribe({
   next: (response) => {
  alert(response); // Will say either "Book deleted" or "Cannot delete"
  if (response === 'Book deleted successfully.') {
    this.getAllBooks(); // Only refresh if actually deleted
  }
},

    error: (err) => {
      // fallback in case of other errors
      this.toastr.error('Something went wrong.');

      console.error(err);
    }
  });
}

 }
