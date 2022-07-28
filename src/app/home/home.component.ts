import { ConditionalExpr, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MenuApiService } from '../services/menuApi/menu-api.service';
import { Plato } from '../user/models/plato-model';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  total_menu = 0;
  total_health_score = 0;
  health_score = 0;
  type_mistake = "";

  img_dish = '';
  title_dish = '';
  time_dish = '';
  type_dish = '';
  hs_dish = '';

  array_vegan_dish : any[] = [];
  array_non_vegan_dish : any[] = [];

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
    //this.clasificarPlatosPrueba(this.xxx);
    this.getMenu();
  }

  public searchDish(name_dish: string){
    $(".list_dishes").css("display","none");
    const search = name_dish == "" ? false : true;
    if(search){
      var list_dish_search = [];
      list_dish_search = this.platos.filter(dish => dish.data.title.toLowerCase().includes(name_dish.toLowerCase()));
      list_dish_search.forEach(dish=>{
        $("#"+dish.data.id).css("display","block");
      })
    }else{
      $(".list_dishes").css("display","block");
    }
  }

  public logOut(){
    this._auth.logOut();
  }

  getMenu(){
    this.menuApi.getPlatos('10').subscribe(data=>{
      this.clasificarPlatos(data['results']);
      this.showDish(0);
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
        this.loadDish(0);
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
        this.loadDish(0);
      });

      
    
  }

  showDish(id: number){
    if(this.platos[id]['data']['vegan']){
      this.type_dish = 'vegano';
    }else{
      this.type_dish = 'no vegano';
    }
    this.loadDish(id);
  }

  private loadDish(id: number){
    this.title_dish = this.platos[id]['data']['title'];
    this.img_dish = this.platos[id]['data']['image'];
    this.time_dish = this.platos[id]['data']['time'];
    this.hs_dish = this.platos[id]['data']['healthScore'];
  }

  private chooseDish(chosen_dish: any){
    console.log(chosen_dish)
    $( "#platos-menu" )
    .append( "<div id='dish_menu"+chosen_dish.id+"' class='dishes-menu row d-flex justify-content-between'><p class='col-md-8 col-7 p-0'>"+chosen_dish.title+"</p><p class='col-md-3 col-2 text-end'>"+chosen_dish.price+"</p></div>" );
    this.total_menu = this.total_menu + chosen_dish.price;
    this.modifyHealtScore(chosen_dish.healthScore , true);
  }

  deleteDish(id: number){
    $("#dish_menu"+this.platos[id]['data']['id']).remove();
    this.total_menu = this.total_menu - this.platos[id]['data']['price'];
    this.modifyHealtScore(this.platos[id]['data']['healthScore'] , false);
  }

  private modifyHealtScore(hs: number, check: boolean){
    console.log(hs)
    console.log(this.array_vegan_dish.length+this.array_non_vegan_dish.length)
    if(check){
      this.total_health_score+=hs;
      this.health_score = this.total_health_score / (this.array_vegan_dish.length+this.array_non_vegan_dish.length)  ;
    }else{
      if(this.array_vegan_dish.length+this.array_non_vegan_dish.length>0){
        this.total_health_score-=hs;
        this.health_score = this.total_health_score / (this.array_vegan_dish.length+this.array_non_vegan_dish.length);
      }
    }
    if(this.array_vegan_dish.length+this.array_non_vegan_dish.length == 0){
      this.resettingValues()
    }
  }

  private resettingValues(){
    this.health_score = 0;
    this.total_health_score = 0;
    this.type_mistake = '';
    this.array_vegan_dish = [];
    this.array_non_vegan_dish = [];
    $(".dish-check").prop("checked", false);
  }

  private combinationOfDishes(list_dishes: any[] , id: number, dish: number, type: string){

      if((list_dishes.length < 2 )&&($("#dish_"+this.platos[id]['data']['id']).prop("checked") == true)){
        list_dishes.push(this.platos[id]['data']);
        this.chooseDish(this.platos[id]['data']);
      }else{
        if((list_dishes[0].id == dish)||(list_dishes[1].id==dish)){
          if(type == 'vegan'){
            this.array_vegan_dish = list_dishes.filter((item: { id: number; })=>{
              return item.id !== dish;
            })
          }else{
            this.array_non_vegan_dish = list_dishes.filter((item: { id: number; })=>{
              return item.id !== dish;
            })
            
          }
          this.deleteDish(id);
        }else{
          $("#dish_"+this.platos[id]['data']['id']).prop("checked", false);
          if(type == 'vegan'){
            this.type_mistake = "No puedes agregar mas platos veganos";
          }else{
            this.type_mistake = "No puedes agregar mas platos no veganos";
          }
          
        }
      }
    
  }

  public checkTypeDish(id: number, dish: number){
    this.type_mistake = '';
    if(this.platos[id]['data']['vegan']==true){
      this.combinationOfDishes(this.array_vegan_dish, id, dish, 'vegan');
    }else{
      this.combinationOfDishes(this.array_non_vegan_dish, id, dish, 'no_vegan');
    }
  
  }

  sendOrder(){
    if(this.array_vegan_dish.length+this.array_non_vegan_dish.length == 4){
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
