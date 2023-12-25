import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CheckFormService } from './check-form.service';
import { AuthService } from './auth.service';
import { RegComponent } from './reg/reg.component';
import { AuthComponent } from './auth/auth.component';
import { BookListComponent } from './book-list/book-list.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookSearchComponent } from './book-search/book-search.component';
import {GoogleBooksService} from "./google-books.service";
import { GoogleBookDetailsComponent } from './google-book-details/google-book-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component';



const appRoute: Routes = [
  {path: '', component: BookListComponent},
  {path: 'reg', component: RegComponent},
  {path: 'auth', component: AuthComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegComponent,
    AuthComponent,
    BookListComponent,
    AddBookComponent,
    EditBookComponent,
    BookDetailsComponent,
    BookSearchComponent,
    GoogleBookDetailsComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-full-width',
      progressBar: true,
      timeOut: 4000,
    }),
  ],
  providers: [
    CheckFormService,
    AuthService,
    GoogleBooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
