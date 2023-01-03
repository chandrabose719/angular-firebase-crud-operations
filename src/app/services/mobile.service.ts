import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Mobile } from '../interfaces/mobile';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor(
    private http: HttpClient
  ) { }

  getPhones() {
    return this.http.get<{[key: string]: Mobile}>(
      "https://ang-mobile-41f1b-default-rtdb.firebaseio.com/mobiles.json"
    )
    .pipe(map((res) => {
      const products = []
      for(const key in res){
        if(res.hasOwnProperty(key)){
          products.push({...res[key], id: key})
        }
      }
      return products;
    }))
  }

  createPhones(mobile: { name: string, description: string, price: string }) {
    return this.http.post(
      "https://ang-mobile-41f1b-default-rtdb.firebaseio.com/mobiles.json",
      mobile
    );
  }

  editPhones(id: string, mobile: { name: string, description: string, price: string }) {
    return this.http.put(
      "https://ang-mobile-41f1b-default-rtdb.firebaseio.com/mobiles/"+ id +".json",
      mobile
    );
  }
  
  deletePhones(id: string) {
    return this.http.delete(
      "https://ang-mobile-41f1b-default-rtdb.firebaseio.com/mobiles/"+ id +".json",
    );
  }

}
