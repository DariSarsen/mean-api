import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInUser: string | null = null;

  login(userLogin: string) {
    this.loggedInUser = userLogin;
  }

  logout() {
    this.loggedInUser = null;
  }
}
