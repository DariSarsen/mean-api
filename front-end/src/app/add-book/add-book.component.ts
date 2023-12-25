import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from '../book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  newBook = {
    title: '',
    author: '',
    description: ''
  };

  constructor(private http: HttpClient, private bookService: BookService , private toastr: ToastrService) { }

  addBook() {
    this.http.post<any>('http://localhost:3000/books', this.newBook)
      .subscribe({
        next: (response) => {
          this.toastr.success('Книга успешно добавлена', 'Успешно');
          this.clearForm();
        },
        error: (error) => {
          this.toastr.error('Ошибка при добавлении книги', 'Ошибка');
        }
      });
  }

  clearForm() {
    this.newBook = {
      title: '',
      author: '',
      description: ''
    };
  };
}
