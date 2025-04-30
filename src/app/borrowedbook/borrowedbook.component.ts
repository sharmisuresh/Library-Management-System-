import { UserService } from './../user.service';
import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-borrowedbook',
  standalone: false,
  templateUrl: './borrowedbook.component.html',
  styleUrl: './borrowedbook.component.css'
})
export class BorrowedbookComponent implements OnInit {
  borrowedBooks: any[] = [];
  email!: string;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    
    this.email = sessionStorage.getItem('userEmail') || '';

    if (this.email) {
      this.userService.getUserByEmail(this.email).subscribe({
        next: (user) => {
          console.log('User Details:', user);
          const userId = user.id;

          this.userService.getIssuedBooksByUserId(userId).subscribe({
            next: (books) => {
              this.borrowedBooks = books;
              console.log('Borrowed Books:', books);
            },
            error: (err) => {
              console.error('Error fetching borrowed books:', err);
            }
          });
        },
        error: (err) => {
          console.error('Error fetching user:', err);
        }
      });
    }
  }
}
