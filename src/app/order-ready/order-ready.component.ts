import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-ready',
  templateUrl: './order-ready.component.html',
  styleUrls: ['./order-ready.component.css']
})
export class OrderReadyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  

  newOrder(){
    console.log('entre')
    $("#order-ready").css("display","none");
    $("#platos").css("filter","brightness(1)")
  }

}
