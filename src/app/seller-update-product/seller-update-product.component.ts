import { Component } from '@angular/core';
import { product } from '../data-type';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {

  productData: undefined | product | any
  productMsg: undefined | string

  constructor(private route: ActivatedRoute, private product: ProductService){

  }

  ngOnInit(): void{
    let productId = this.route.snapshot.paramMap.get('id')
    
    console.warn(`Product Id: ${productId}`)
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.warn(`getProduct by id: ${data}`)
      this.productData = data
    })
  }
  submit(data:product){
    console.warn(`submitted id: ${data}`)
    if(this.productData){
      data.id = this.productData.id
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMsg = "Product updated successfully!"
      }
    })

    setTimeout(()=>{
      this.productMsg = undefined
    },3000)
  }
}
