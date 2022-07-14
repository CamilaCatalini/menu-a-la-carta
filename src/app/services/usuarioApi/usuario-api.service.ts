import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioApiService {

  public usuario = "";
  public password = "";
    
    constructor() { }

    getUsuario(){
        return this.usuario;
    }

    getPassword(){
        return this.password;
    }

    cambiarUsuario(usuario : string){
        this.usuario = usuario;
    }

    cambiarPassword(password : string){
        this.password = password;
    }
}
