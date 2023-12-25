import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private apiKey = 'AIzaSyDY_D5J1yiv0o7R252tjHjHwPU2Xs2vWbg';

  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=${query}&key=${this.apiKey}`);
  }

  getBestsellers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?q=bestsellers&key=${this.apiKey}`);
  }

  getBookDetails(bookId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${bookId}?key=${this.apiKey}`);
  }

}
