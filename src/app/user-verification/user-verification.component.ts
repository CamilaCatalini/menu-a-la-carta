import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.css']
})
export class UserVerificationComponent implements OnInit {

  public login : boolean;
  public user : any;

  constructor(private _service : AuthService, private _router : Router) {
    this.login = false;
  }

  ngOnInit(): void {
    this.userLogueado();
    }
  
  userLogueado(){
    this._service.getInfoUsuarioLoggeado().subscribe(res=>{
    if(res != null){
      this.login = true;
      this.user = res
    }else{
      this.login = false;
      window.location.href="/";
    }  
  });
}



}
