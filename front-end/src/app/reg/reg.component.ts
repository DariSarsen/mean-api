import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent {
  newUser = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private authService: AuthService) {}

  registerUser() {
    this.http.post<any>('http://localhost:3000/account/reg', this.newUser)
      .subscribe({
        next: (response) => {
          this.toastr.success(response.message, 'Успешная регистрация');
          this.authService.login(this.newUser.name);
          this.router.navigate(['/']);
        },
        error: (error) => {
          if (error && error.error && error.error.message) {
            this.toastr.error(error.error.message, 'Ошибка при регистрации');
          } else {
            this.toastr.error('Что-то пошло не так', 'Ошибка при регистрации');
          }
          console.error('Ошибка при регистрации:', error);
        }
      });
  }



}
