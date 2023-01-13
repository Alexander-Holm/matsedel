import { Recipe, type RecipeDto } from "./Recipe";

export type WeekDto = {
    id: number;
    name: string;
    recipes: RecipeDto[];
}
export class Week{
    id: number;
    name: string;
    days: Day[];
    constructor(weekDto: WeekDto){
        this.id = weekDto.id;
        this.name = weekDto.name;
        this.days = [];
        for (const recipeDto of weekDto.recipes) {
            const recipe = new Recipe(recipeDto);
            let day = this.days.find(day => day.key == recipeDto.day);
            if(day === undefined) {
                day = { key: recipeDto.day, recipes: [] }
                this.days.push(day);
            }
            day.recipes.push(recipe);
        }
    }
}

export type Day = {
    key: Days,
    recipes: Recipe[]
}

export enum Days{ Måndag, Tisdag, Onsdag, Torsdag, Fredag, Lördag, Söndag }