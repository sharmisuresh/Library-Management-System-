import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-addbook',
  standalone: false,
  templateUrl: './addbook.component.html',
  styleUrl: './addbook.component.css'
})
export class AddbookComponent implements OnInit {

  bookForm!: FormGroup;
  isEditMode = false;
  bookId!: number;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      available: [true]
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.bookId = +idParam;
        this.loadBookData(this.bookId);
      }
    });
  }

  loadBookData(id: number) {
    this.bookService.getBookById(id).subscribe(data => {
      this.bookForm.patchValue(data);
    });
  }

  onSubmit() {
    const formData = this.bookForm.value;

    if (this.isEditMode) {
      this.bookService.updateBook(this.bookId, formData).subscribe(() => {
        alert('Book updated successfully!');
         this.router.navigate(['/admin-dashboard/managebook']);
      });
    } else {
      this.bookService.addBook(formData).subscribe(() => {
        alert('Book added successfully!');
        this.bookForm.reset(); // ✅ Clears the form
        this.router.navigate(['/admin-dashboard/managebook']);
        // this.router.navigate(['managebook']);
      });
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/managebook']);
  }
}
