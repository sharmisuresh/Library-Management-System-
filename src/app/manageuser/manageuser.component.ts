import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-manageuser',
  standalone: false,
  templateUrl: './manageuser.component.html',
  styleUrl: './manageuser.component.css'
})
export class ManageuserComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        // Keep only non-admin users
        this.users = res.filter(user => user.role !== 'admin');
      },
      error: (err) => console.error('Error loading users', err)
    });
  }

  deleteUser(id: number): void {
    if (!confirm('Are you sure you want to delete this user?')) return;
    this.userService.deleteUser(id).subscribe({
      next: (msg) => {
        alert(msg);
        this.loadUsers(); // refresh list
      },
      error: (err) => {
        console.error('Delete failed', err);
        alert('Delete failed');
      }
    });
  }

}
