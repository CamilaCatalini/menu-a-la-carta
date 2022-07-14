export class Plato{

    id: number;
    title: string;
    vegan: boolean;
    healthScore: number;
    price: number;
    time: number;
    img: string; 
 
    constructor(plato: any){
        this.id = plato['id'],
        this.title = plato['title'],
        this.vegan = plato['vegan'],
        //this.vegano = plato['vegano'],
        this.healthScore = plato['healthScore'],
        this.price = plato['pricePerServing'],
        //this.price = plato['price'],
        this.time = plato['readyInMinutes'],
        this.img = plato['image']
    }

    public getId(){
        return this.id;
    }

    public getTitle(){
        return this.title;
    }
    public getVegano(){
        return this.vegan;
    }
    public getHealthScore(){
        return this.healthScore;
    }
    public getPrice(){
        return this.price;
    }
    public getImg(){
        return this.img;
    }
}