import { Recipe, type RecipeDto } from "./Recipe";

export type WeekDto = {
    id: number;
    name: string;
    recipes: RecipeDto[];
}
export class Week{
    id: number;
    name: string;
    recipes: Recipe[];
    constructor(weekDto: WeekDto){
        this.id = weekDto.id;
        this.name = weekDto.name;
        this.recipes = [];
        // Lägger recepten på det index i arrayen som matchar dagen,
        // för att lättare kunna hitta vilka dagar som har recept.
        for (const recipeDto of weekDto.recipes) {
            this.recipes[recipeDto.day] = new Recipe(recipeDto);
        }
    }
}