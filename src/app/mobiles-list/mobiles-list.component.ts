import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Mobile } from '../interfaces/mobile';

import { MobileService } from '../services/mobile.service';

declare var window: any;

@Component({
  selector: 'app-mobiles-list',
  templateUrl: './mobiles-list.component.html',
  styleUrls: ['./mobiles-list.component.css']
})
export class MobilesListComponent implements OnInit {

  onLoader = false;
  allProducts: Mobile[] = [];
  submit = false;
  products = {
    name: "",
    description: "",
    price: ""
  }
  editModal: any;
  @ViewChild('edit') form!: NgForm;
  currentId = '';

  constructor(
    private MobileService: MobileService
  ) { }

  ngOnInit(): void {
    this.onGetMobiles();
    this.editModal = new window.bootstrap.Modal(
      document.getElementById('editModal')
    );
  }

  allProductsLength(){
    if (this.allProducts.length > 0) return true;
    else return false;  
  }

  getAllProducts(){
    this.onGetMobiles();
  }

  async onGetMobiles(){
    this.onLoader = true;
    await this.MobileService.getPhones()
    .subscribe({
      next: (res) => { 
        console.log("res: ", res);
        this.allProducts = res;
        this.onLoader = false;
      },
      error: (err) => { 
        console.log("res: ", err);
      }
    })
  }

  onEditClicked(id: string){
    console.log("get edit: ", id);
    let clickedPro = this.allProducts.find((p) => { return p.id === id });  
    console.log("get edit: ", clickedPro);
    this.form.setValue({
      name: clickedPro?.name,
      description: clickedPro?.description,
      price: clickedPro?.price,
    })
    this.currentId = id;
    this.editModal.show();
  }

  async onEditMobile(){
    this.onLoader = true;
    await this.MobileService.editPhones(this.currentId, this.products)
    .subscribe({
      next: (res) => { 
        console.log("res: ", res);
        this.onLoader = false;
        this.editModal.hide();
        this.onGetMobiles();
      },
      error: (err) => { 
        console.log("res: ", err);
      }
    })
  }

  async onDeleteClicked(id: string){
    this.onLoader = true;
    await this.MobileService.deletePhones(id)
    .subscribe({
      next: (res) => { 
        console.log("res: ", res);
        this.onLoader = false;
        this.onGetMobiles();
      },
      error: (err) => { 
        console.log("res: ", err);
      }
    })
  }

}
