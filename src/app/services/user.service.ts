import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(user: signUp){
    console.warn(user)
    return this.http.post('http://localhost:3000/users', user, {observe: 'response'})
      .subscribe((result)=>{
        if(result){
          localStorage.setItem('user', JSON.stringify(result.body))
          this.router.navigate(['/'])
        }
      });
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }

  userLogin(data: login){
    this.http.get<signUp>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe: 'response'})
    .subscribe((result)=>{
      if(result){
        let res = JSON.stringify(result.body)
        if(res=='[]'){
          this.invalidUserAuth.emit(true)
        }else{
        this.invalidUserAuth.emit(false)
        localStorage.setItem('user', JSON.stringify(result.body))
          this.router.navigate(['/'])
      }
      }
    })
  }
}
