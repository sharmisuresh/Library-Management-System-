import { Component } from '@angular/core';
import { BookrequestService } from '../bookrequest.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bookrequest',
  standalone: false,
  templateUrl: './bookrequest.component.html',
  styleUrl: './bookrequest.component.css'
})
export class BookrequestComponent {
  request = {
    title: '',
    author: '',
    genre: '',
    version: ''
  };

  message = '';

  constructor(private bookrequestService: BookrequestService, private toastr: ToastrService) {}

  submitRequest() {
    this.bookrequestService.requestBook(this.request).subscribe(response => {
      this.message = response;
      this.request = { title: '', author: '', genre: '' ,version: ''};
    });
  }
}
