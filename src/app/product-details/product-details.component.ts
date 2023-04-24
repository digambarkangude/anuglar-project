import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productData: undefined | product | any
  productQuantity: number=1
  removeCart=false
  constructor(private activateRoute: ActivatedRoute, private product: ProductService){

  }

  ngOnInit(): void{
    let productId = this.activateRoute.snapshot.paramMap.get('productId')
    console.warn(`productId: ${productId}`)
    productId && this.product.getProduct(productId).subscribe((result)=>{
      console.warn(`result: ${result}`)
      this.productData = result

      let cartData = localStorage.getItem('localCart')
      if(productId && cartData){
        let items = JSON.parse(cartData)
        items = items.filter((item:product)=>productId == item.id.toString())
        if(items.length!==0){
          this.removeCart = true
        }else{
          this.removeCart = false
        }
      }
    })
  }


  handleQuantity(val: string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1
    }
  }

  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity
      if(localStorage.getItem('user')){
        this.product.localAddToCart(this.productData)
        this.removeCart = true
      }
      
    }
  }

  removeToCart(id: number){

  }
}
