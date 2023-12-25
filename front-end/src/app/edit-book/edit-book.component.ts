import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  bookId: string | null = null; // Используем тип string | null

  updatedBook: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private bookService: BookService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id') || '';
      this.getBookDetails();
    });
  }

  getBookDetails() {
    this.http.get<any>(`http://localhost:3000/books/${this.bookId}`)
      .subscribe(book => {
        this.updatedBook = book;
      });
  }

  updateBook() {
    if (this.bookId) {
      this.http.put<any>(`http://localhost:3000/books/${this.bookId}`, this.updatedBook)
        .subscribe({
          next: () => {
            this.toastr.success('Информация о книге успешно обновлена', 'Успешно');
            // Действия после успешного обновления книги, например, перезагрузка списка книг
            // Если нужно, можно добавить перезагрузку списка книг через вызов метода getBookDetails() снова
          },
          error: () => {
            this.toastr.error('Ошибка при обновлении информации о книге', 'Ошибка');
          }
        });
    }
  }
}
