import { Component, OnInit } from '@angular/core';
import { BookrequestService } from '../bookrequest.service';
import { ToastrService } from 'ngx-toastr';

interface BookRequest {
  id: number;
  title: string;
  author: string;
  genre: string;
  approved: boolean;
}


@Component({
  selector: 'app-managerequest',
  standalone: false,
  templateUrl: './managerequest.component.html',
  styleUrl: './managerequest.component.css'
})

export class ManagerequestComponent implements OnInit {

  requests: BookRequest[] = [];
  currentPage = 1;
pageSize = 7; // You can change this to show more per page
totalPages = 0;
displayedReports: any[] = [];



  constructor(private bookrequestService: BookrequestService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests() {
    this.bookrequestService.getAllRequests().subscribe(
      (data: BookRequest[]) => {
        this.requests = data;
        this.totalPages = Math.ceil(this.requests.length / this.pageSize);
    this.updateDisplayedReports();
      },
      (error) => {
        console.error('Error fetching book requests:', error);
      }
    );
  }
  updateDisplayedReports(): void {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.displayedReports = this.requests.slice(startIndex, endIndex);
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


  approveRequest(requestId: number) {
    this.bookrequestService.approveRequest(requestId).subscribe(
      () => {
        this.getRequests();
        this.toastr.error('Book request approved successfully!');

      },
      (error) => {
        console.error('Error approving request:', error);
        this.toastr.error('Error approving request.');

      }
    );
  }
}
