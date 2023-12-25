import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[] = [];

  constructor(private router: Router ,private http: HttpClient) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.http.get<any[]>('http://localhost:3000/books')
      .subscribe(books => {
        this.books = books;
      });
  }

  deleteBook(bookId: string) {
    this.http.delete<any>(`http://localhost:3000/books/${bookId}`)
      .subscribe(() => {
        // Действия после успешного удаления книги, например, перезагрузка списка книг
        this.getBooks(); // Перезагрузка списка книг
      });
  }


  bookDetails(bookId: string) {
    this.router.navigate(['/books', bookId]);
  }


}
