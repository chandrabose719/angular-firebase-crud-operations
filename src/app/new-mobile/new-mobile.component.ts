import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MobileService } from '../services/mobile.service';

@Component({
  selector: 'app-new-mobile',
  templateUrl: './new-mobile.component.html',
  styleUrls: ['./new-mobile.component.css']
})
export class NewMobileComponent implements OnInit {

  submit = false;
  loading = false;
  products = {
    name: "",
    description: "",
    price: ""
  }

  constructor(
    private MobileService: MobileService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async onNewProduct(){
    this.loading = true;
    console.log('new product: ', this.products);
    await this.MobileService.createPhones(this.products)
    .subscribe({
      next: (res) => { 
        console.log("res: ", res);
        this.loading = false;
        this.router.navigate(['/mobile/all']);
      },
      error: (err) => { 
        console.log("res: ", err);
        this.loading = false;
      }
    })
  }
}
