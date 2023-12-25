import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private bookAddedSubject = new Subject<void>();
  private bookEditedSubject = new Subject<void>();

  bookAdded$ = this.bookAddedSubject.asObservable();
  bookEdited$ = this.bookEditedSubject.asObservable();

  notifyBookAdded() {
    this.bookAddedSubject.next();
  }

  notifyBookEdited() {
    this.bookEditedSubject.next();
  }
}
