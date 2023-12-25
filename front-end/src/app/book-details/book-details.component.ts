import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookId: string;
  bookDetails: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.bookId = ''; // Начальное значение bookId
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id') || '';
      this.getBookDetails();
    });
  }

  getBookDetails() {
    this.http.get<any>(`http://localhost:3000/books/${this.bookId}`)
      .subscribe(book => {
        this.bookDetails = book;
      });
  }
}
