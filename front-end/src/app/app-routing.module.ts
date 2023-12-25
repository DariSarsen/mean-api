import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { AddBookComponent } from './add-book/add-book.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { GoogleBookDetailsComponent } from './google-book-details/google-book-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' }, // Переадресация на /books по умолчанию
  { path: 'file', component: FileUploadComponent },
  { path: 'books', component: BookListComponent },
  { path: 'add', component: AddBookComponent },
  { path: 'edit/:id', component: EditBookComponent },
  { path: 'books/:id', component: BookDetailsComponent }, // Маршрут для подробностей книги
  { path: 'googleBooks/:id', component: GoogleBookDetailsComponent } // Маршрут для подробностей google книги

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
