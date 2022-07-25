import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MenuApiService } from '../services/menuApi/menu-api.service';
import { Plato } from '../user/models/plato-model';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  total_menu = 0;
  number_of_dishes = 0;
  total_health_score = 0;
  health_score = 0;
  number_vegan_dish = 0;
  number_non_vegan_dish = 0 ;
  type_mistake = "";

  img_dish = '';
  title_dish = '';
  time_dish = '';
  type_dish = '';
  hs_dish = '';

  plato! : Plato;
  show_home : boolean = false;

  lista_platos : any[] = [];
  platos : any[] = [];

  xxx : any[] = [
    {
        "id": 715594,
        "title": "Homemade Garlic and Basil French Fries",
        "vegan": true,
        "healthScore": 77,
        "pricePerServing": 83.23,
        "image": "https://spoonacular.com/recipeImages/715594-556x370.jpg"
    },
    {
        "id": 716381,
        "title": "Nigerian Snail Stew",
        "vegan": false,
        "healthScore": 89,
        "pricePerServing": 908.06,
        "image": "https://spoonacular.com/recipeImages/716381-556x370.jpg"
    },
    {
        "id": 716426,
        "title": "Cauliflower, Brown Rice, and Vegetable Fried Rice",
        "vegan": true,
        "healthScore": 76,
        "pricePerServing": 112.39,
        "image": "https://spoonacular.com/recipeImages/716426-556x370.jpg"
    },
    {
        "id": 794349,
        "title": "Broccoli and Chickpea Rice Salad",
        "vegan": true,
        "healthScore": 100,
        "pricePerServing": 137.57,
        "image": "https://spoonacular.com/recipeImages/794349-556x370.jpg"
    },
    {
        "id": 782601,
        "title": "Red Kidney Bean Jambalaya",
        "vegan": true,
        "healthScore": 100,
        "pricePerServing": 185.77,
        "image": "https://spoonacular.com/recipeImages/782601-556x370.jpg"
    },
    {
        "id": 716268,
        "title": "African Chicken Peanut Stew",
        "vegan": false,
        "healthScore": 100,
        "pricePerServing": 355.78,
        "image": "https://spoonacular.com/recipeImages/716268-556x370.jpg"
    },
    {
        "id": 715446,
        "title": "Slow Cooker Beef Stew",
        "vegan": false,
        "healthScore": 100,
        "pricePerServing": 293.64,
        "image": "https://spoonacular.com/recipeImages/715446-556x370.jpg"
    },
    {
        "id": 715415,
        "title": "Red Lentil Soup with Chicken and Turnips",
        "vegan": false,
        "healthScore": 73,
        "pricePerServing": 276.67,
        "image": "https://spoonacular.com/recipeImages/715415-556x370.jpg"
    },
    {
        "id": 715497,
        "title": "Berry Banana Breakfast Smoothie",
        "vegan": false,
        "healthScore": 63,
        "pricePerServing": 204.29,
        "image": "https://spoonacular.com/recipeImages/715497-556x370.jpg"
    },
    {
        "id": 644387,
        "title": "Garlicky Kale",
        "vegan": true,
        "healthScore": 92,
        "pricePerServing": 69.09,
        "image": "https://spoonacular.com/recipeImages/644387-556x370.jpg"
    }
]

  constructor(private menuApi:MenuApiService, private _auth : AuthService) { }

  ngOnInit(): void {
    this.clasificarPlatosPrueba(this.xxx);
    //this.getMenu();
  }
  
  public logOut(){
    this._auth.logOut();
  }

  getMenu(){
    this.menuApi.getPlatos('10').subscribe(data=>{
      this.clasificarPlatos(data['results']);
    })
  }

  clasificarPlatos(data_platos: any[]){

    data_platos.forEach((element: any) => {
      this.lista_platos.push(this.menuApi.getInfoPlato(element['id']));
    });

    this.lista_platos.forEach(element=>{
      element.subscribe((data: any)=>{
        var key = data['id']
        this.plato = new Plato(data);
        
        this.platos.push({ data : this.plato});
        console.log(this.plato)
        this.showDish(0);
      })
      
    })
  }

  clasificarPlatosPrueba(data_platos: any[]){

    data_platos.forEach((element: any) => {
      this.lista_platos.push(element);
    });

    this.lista_platos.forEach(element=>{
        this.plato = new Plato(element);
        this.platos.push({ data : this.plato});
        
      });

      
    
  }

  showDish(id: number){
    if(this.platos[id]['data']['vegan']){
      this.type_dish = 'vegano';
    }else{
      this.type_dish = 'no vegano';
    }
    this.title_dish = this.platos[id]['data']['title'];
    this.img_dish = this.platos[id]['data']['image'];
    this.time_dish = this.platos[id]['data']['time'];
    this.hs_dish = this.platos[id]['data']['healthScore'];
    
  }

  chooseDish(id: number){
    var id_dish = this.platos[id]['data']['id'];
    $( "#platos-menu" )
    .append( "<div id='dish_menu"+id_dish+"' class='dishes-menu row d-flex justify-content-between'><p class='col-md-8 col-7'>"+this.platos[id]['data']['title']+"</p><p class='col-md-3 col-2 text-end'>"+this.platos[id]['data']['price']+"</p></div>" );
    this.total_menu = this.total_menu + this.platos[id]['data']['price'];
  }

  deleteDish(id: number){
    if(this.platos[id]['data']['vegan']){
      this.number_vegan_dish--;
    }else{
      this.number_non_vegan_dish--;
    }
    $("#dish_menu"+this.platos[id]['data']['id']).remove();
    this.total_menu = this.total_menu - this.platos[id]['data']['price'];
    
  }

  modifyHealtScore(hs: number, check: boolean){
    
    if(check){
      this.total_health_score+=hs;
      this.health_score = this.total_health_score / this.number_of_dishes;
    }else{
      if(this.number_of_dishes>0){
        this.total_health_score-=hs;
        this.health_score = this.total_health_score / this.number_of_dishes;
        
      }else{
        this.resettingValues();
      }
    }
  }

  checkDishType(id: number){
    if(this.platos[id]['data']['vegan']){
      this.number_vegan_dish++;
    }else{
      this.number_non_vegan_dish++;
    }
  }

  resettingValues(){
    this.health_score = 0;
    this.number_of_dishes = 0;
    this.total_health_score = 0;
    this.type_mistake = '';
    this.number_vegan_dish = 0;
    this.number_non_vegan_dish = 0;
    $(".dish-check").prop("checked", false);
  }

  checkBox(id: number){
    
    if($("#dish_"+this.platos[id]['data']['id']).prop("checked") == true){
      this.number_of_dishes++;
      this.chooseDish(id);
      this.checkDishType(id);
      this.modifyHealtScore(this.platos[id]['data']['healthScore'], true);
    }else{
      this.number_of_dishes--;
      this.deleteDish(id);
      this.modifyHealtScore(this.platos[id]['data']['healthScore'], false);
    }
    console.log(this.number_non_vegan_dish)
  }

  checkCombinationOfDishes(id: number){

    if((this.platos[id]['data']['vegan']==true)&&(this.number_vegan_dish<2)){
      this.type_mistake = "";
      this.checkBox(id);
    }else if((this.platos[id]['data']['vegan']==false)&&(this.number_non_vegan_dish<2)){
      this.type_mistake = "";
      this.checkBox(id);
    }else if($("#dish_"+this.platos[id]['data']['id']).prop("checked") == false){
      this.type_mistake = "";
      this.checkBox(id);
    }else{
      console.log(this.number_vegan_dish)
      $("#dish_"+this.platos[id]['data']['id']).prop("checked", false);
      if(this.number_vegan_dish==2){
        this.type_mistake = "No puedes agregar mas platos veganos";
      }else{
        this.type_mistake = "No puedes agregar mas platos no veganos";
      }
    }
  }

  sendOrder(){
    if((this.number_non_vegan_dish==2)&&(this.number_vegan_dish==2)){
      this.total_menu = 0;
      this.resettingValues();
      $('.dishes-menu').remove();
      $("#order-ready").css("display","block");
      $("#platos").css("filter","brightness(0.4)");
    }else{
      this.type_mistake = "Orden incompleta";
    }
  }
  

}
