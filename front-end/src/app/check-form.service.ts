import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckFormService {

  constructor() { }

  checkName(name:string): boolean{
    if(name == ''){
      return false
    }
    else{
      return true
    }
  }
  checkLogin(login:string): boolean{
    if(login == ''){
      return false
    }
    else{
      return true
    }
  }
  checkEmail(email:string): boolean{
    if(email == ''){
      return false
    }
    else{
      return true
    }
  }
  checkPassword(password:string): boolean{
    if(password == ''){
      return false
    }
    else{
      return true
    }
  }
  checkDescription(description:string): boolean{
    if(description == ''){
      return false
    }
    else{
      return true
    }
  }
}
