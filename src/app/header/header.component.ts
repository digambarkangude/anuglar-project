import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  
  menuType: string='default'
  sellerName: string=''
  searchResult: undefined | product | any
  userName: string=''
  cartItems=0

  constructor(private route: Router, private product: ProductService){}

  ngOnInit(): void{
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          this.menuType = 'seller'
          if(localStorage.getItem('seller')){
            console.log('after login into seller')
            let sellerStorage = localStorage.getItem('seller')
            let sellerData = sellerStorage && JSON.parse(sellerStorage)[0]
            this.sellerName = sellerData.name
            console.log(this.sellerName)
          }
        }else if(localStorage.getItem('user')){
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore)
          console.log('after login into user')
          this.userName = userData.name
          this.menuType = 'user'
        }else{
          console.log('after login into default')
          this.menuType = 'default'
        }
      }
    })

    let cartData = localStorage.getItem('localCart')
    if(cartData){
      this.cartItems = JSON.parse(cartData).length
    }

    this.product.cartData.subscribe((items)=>{
      this.cartItems=items.length
    })
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement
      this.product.searchProducts(element.value).subscribe((data)=>{
        this.searchResult = data
      })
    }
  }

  hideSearch(){
    this.searchResult=undefined
  }

  submitSearch(val:string){
    this.route.navigate([`search/${val}`])
  }

  redirectToDetails(id: number){
    this.route.navigate([`/details/${id}`])
  }

  logout(){
    localStorage.removeItem('seller')
    this.route.navigate(['home'])
  }

  userLogout(){
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth'])
  }
}
