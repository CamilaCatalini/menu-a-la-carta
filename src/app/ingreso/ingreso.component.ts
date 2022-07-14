import { Component, OnInit} from '@angular/core';
import { UsuarioApiService } from '../services/usuarioApi/usuario-api.service'; 
import { AppComponent } from '../app.component';

import * as $ from 'jquery';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  constructor(private usuario: UsuarioApiService, private app: AppComponent) { }

  ngOnInit(): void {
  }

  validar(){
    var usuario = $("#mail").val();
    var password = $("#password").val();

    this.usuario.cambiarUsuario(String(usuario));
    this.usuario.cambiarPassword(String(password));
    

    console.log(this.usuario.usuario)

    if((this.usuario.usuario == 'challenge@alkemy.org')&&(this.usuario.password == 'react')){
      window.location.href="http://localhost:4200/home";
    }
  }

}
