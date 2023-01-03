import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  brandName = "ONLINE PRODUCTS";

  links = [
    { name: "MOBILE", path: "/mobile/all" }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
