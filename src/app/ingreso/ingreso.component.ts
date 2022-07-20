import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {


  constructor(private _auth : AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.logOut();
  }

  logOut(){
    this._auth.logOut();
  }

  logIn(){
    var mail = $("#mail").val();
    var password = $("#password").val();

    this._auth.login(String(mail), String(password)).then(res=> {
      this._router.navigate(['home']);
    });

  }

}
