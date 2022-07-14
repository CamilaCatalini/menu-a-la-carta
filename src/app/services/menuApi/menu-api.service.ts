import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const APY_KEY = '8ce7aae2d83a4177a8fe8cf4f57fdb28';
const URL_MENU = "https://api.spoonacular.com/recipes/complexSearch?apiKey=8ce7aae2d83a4177a8fe8cf4f57fdb28";


@Injectable({
  providedIn: 'root'
})
export class MenuApiService {

  constructor(private httpClient: HttpClient) { }

  getPlatos(cant: string): Observable <any>{
    var url = URL_MENU+'&number=' + cant;
    return this.httpClient.get(url);
  }

  getInfoPlato(id: string){
    var url = 'https://api.spoonacular.com/recipes/'+id+'/information?apiKey=' + APY_KEY;
    return this.httpClient.get(url);
  }
}
 