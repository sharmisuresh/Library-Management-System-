import { Component, OnInit  } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newarrival',
  standalone: false,
  templateUrl: './newarrival.component.html',
  styleUrl: './newarrival.component.css'
})
export class NewarrivalComponent implements OnInit{
 newBooks: any[] = [];

  constructor(private bookService: BookService, private router: Router,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.bookService.getNewArrivals().subscribe({
      next: (res) => this.newBooks = res,
      error: (err) => console.error('Error fetching new arrivals', err)
    });
  }

  goHome() {
    this.router.navigate(['/home']); // or use Angular router
  }
}
