import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import {response} from "express";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  loginData = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private authService: AuthService) {}

  loginUser() {
    this.http.post<any>('http://localhost:3000/account/login', this.loginData)
      .subscribe( {
        next: (response) => {
          this.toastr.success('Аутентификация успешна!', 'Успех');
          this.authService.login(response.user.name);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.toastr.error(error.error.message, 'Ошибка при аутентификации');
          console.error('Ошибка при аутентификации:', error);
        }
      });
  }

}
