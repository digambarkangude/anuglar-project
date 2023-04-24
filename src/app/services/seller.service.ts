import { Injectable, EventEmitter  } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { signUp } from '../data-type';
import {BehaviorSubject} from 'rxjs'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isLoginError = new EventEmitter<boolean>(false)
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data:signUp){
    this.http.post('http://localhost:3000/seller',data, {observe: 'response'}).subscribe((result)=>{
    this.isSellerLoggedIn.next(true)
    localStorage.setItem('seller', JSON.stringify(result.body))
    this.router.navigate(['seller-home'])
    })
    
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(data: any){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe: 'response'}
    ).subscribe((result:any)=>{
      console.warn('result==>', result)
      if(result && result.body && result.body.length){
        console.warn('user logged in')
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      }else{
        console.warn('login failed')
        this.isLoginError.emit(true)
      }
    })
  }
}
