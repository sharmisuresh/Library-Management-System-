import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manageuser',
  standalone: false,
  templateUrl: './manageuser.component.html',
  styleUrl: './manageuser.component.css'
})
export class ManageuserComponent implements OnInit {
  users: any[] = [];
  currentPage = 1;
pageSize = 7; // You can change this to show more per page
totalPages = 0;
displayedReports: any[] = [];


  constructor(private userService: UserService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        // Keep only non-admin users
        this.users = res.filter(user => user.role !== 'admin');
         this.totalPages = Math.ceil(this.users.length / this.pageSize);
    this.updateDisplayedReports();
      },

      error: (err) => console.error('Error loading users', err)
    });
  }
  updateDisplayedReports(): void {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.displayedReports = this.users.slice(startIndex, endIndex);
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.updateDisplayedReports();
  }
}

prevPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.updateDisplayedReports();
  }
}


  deleteUser(id: number): void {
    if (!confirm('Are you sure you want to delete this user?')) return;
    this.userService.deleteUser(id).subscribe({
      next: (msg) => {
        
        this.toastr.success(msg);

        this.loadUsers(); // refresh list
      },
      error: (err) => {
        console.error('Delete failed', err);
        this.toastr.error('Delete failed');

      }
    });
  }

}
