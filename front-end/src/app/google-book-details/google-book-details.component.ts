import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleBooksService } from '../google-books.service';

@Component({
  selector: 'app-google-book-details',
  templateUrl: './google-book-details.component.html',
  styleUrls: ['./google-book-details.component.css']
})
export class GoogleBookDetailsComponent implements OnInit {
  bookId: string = '';
  bookDetails: any = {};

  constructor(private route: ActivatedRoute, private googleBooksService: GoogleBooksService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
      this.loadBookDetails(this.bookId);
    });
  }

  loadBookDetails(id: string) {
    this.googleBooksService.getBookDetails(id).subscribe(data => {
      this.bookDetails = data;
    });
  }
}
