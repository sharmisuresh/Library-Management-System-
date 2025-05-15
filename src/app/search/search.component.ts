import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
   books: any[] = [];
   isFilterApplied = false;
   filteredBooks: any[] = [];
    keyword: string = '';
    showFilter = false;
    bookName: string = '';
    genre: string = '';
     displayedBooks: any[] = []; // books shown on current page
pageSize = 5;             // books per page
currentPage = 1;
totalPages = 0;

     constructor(private bookService: BookService, private router: Router) {}
    ngOnInit(): void {
      this.getAllBooks();
    }
    onSearch(): void {
      this.isFilterApplied = false;
      if (this.keyword.trim() === '') {
        this.getAllBooks(); // If search is empty, show all books
        return;
      }


      this.bookService.searchBooks(this.keyword).subscribe({
        next: (res) => {
          // Ensure response is an array before assigning
          this.books = Array.isArray(res) ? res : [];
          this.books = res;
          this.filteredBooks = res;
        },
        error: (err) => {
          alert('Error searching books!');
          console.error(err);
          this.books = []; // Ensure no invalid data
        }
      });
    }

     toggleFilter(): void {
    this.showFilter = !this.showFilter;
  }


      applyFilter(): void {
        this.isFilterApplied = true;

        this.bookService.filterBooks(this.bookName, this.genre).subscribe({
          next: (res) => {
            this.filteredBooks = Array.isArray(res) ? res : [];
            this.showFilter = false; // Close popup

            this.bookName = '';
             this.genre = '';
          },
          error: (err) => {
            alert('Error filtering books!');
            console.error(err);
            this.filteredBooks = [];
          }
        });
      }

      cancelFilter(): void {
        this.showFilter = false;

        // ✅ Clear filter fields
        this.bookName = '';
        this.genre = '';
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
 goHome(): void {
    this.router.navigate(['/home']);
  }

}
