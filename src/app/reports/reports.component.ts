import { Component, OnInit } from '@angular/core';
import { ReportserviceService } from '../reportservice.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  reports: any[] = [];
  role: string = 'admin';
  currentPage = 1;
pageSize = 7; // You can change this to show more per page
totalPages = 0;
displayedReports: any[] = [];


  constructor(private adminReportService: ReportserviceService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getIssuedBooksReports();
  }

  getIssuedBooksReports(): void {
    this.adminReportService.getIssuedBooksReports(this.role).subscribe((data) => {
      this.reports = data.map((item: any) => ({
        userId: item.user.id,
        userName: item.user.userName,
        borrowedBookTitle: item.book.title,
        issueDate: new Date(item.issueDate).toLocaleString(),
        returnDate: item.returnDate ? new Date(item.returnDate).toLocaleString() : 'Not returned',
        fine: item.fine
      }));
      this.totalPages = Math.ceil(this.reports.length / this.pageSize);
    this.updateDisplayedReports();
    });
  }
updateDisplayedReports(): void {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = startIndex + this.pageSize;
  this.displayedReports = this.reports.slice(startIndex, endIndex);
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


}
