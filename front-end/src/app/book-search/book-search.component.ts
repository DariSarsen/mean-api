import { Component } from '@angular/core';
import { GoogleBooksService } from '../google-books.service';
import { Router } from '@angular/router';


import { FormControl } from '@angular/forms';
import { catchError, filter, switchMap} from 'rxjs/operators';
import { EMPTY } from 'rxjs';


@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent {
  books: any[] = [];
  bestsellers: any[] = [];

  searchControl = new FormControl('');


  constructor(private router: Router, private googleBooksService: GoogleBooksService)  {
    this.searchControl.valueChanges.pipe(
      filter((query: any): query is string => !!query && typeof query === 'string' && query.trim().length > 0),
      switchMap((query: string) => {
        return this.googleBooksService.searchBooks(query).pipe(
          catchError(() => EMPTY)
        );
      })
    ).subscribe((data: any) => {
      this.books = data.items || []; // Обновление списка книг при изменении результатов поиска
    });
  }

  // searchBooks() {
  //   this.googleBooksService.searchBooks(this.query).subscribe(data => {
  //     this.books = data.items;
  //   });
  // }

  ngOnInit() {
    this.googleBooksService.getBestsellers().subscribe(data => {
      console.log(data.items)
      this.bestsellers = data.items;
    });
  }

  viewBookDetails(bookId: string) {
    this.router.navigate(['/googleBooks', bookId]);
  }


}
