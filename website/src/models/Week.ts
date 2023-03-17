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
            let day = this.days.find(day => day.key === recipeDto.day);
            // Dagarna kan skapas i "fel" ordning, t.ex. onsdag hamnar före måndag
            if(day === undefined) {
                day = { key: recipeDto.day, recipes: [] }
                this.days.push(day);
            }
            day.recipes.push(recipe);
        }
        // Sortera dagarna till: måndag, tisdag, ..., söndag
        this.days.sort((a, b) => a.key - b.key);
    }
}

export type Day = {
    key: Days,
    recipes: Recipe[]
}

export enum Days{ Måndag, Tisdag, Onsdag, Torsdag, Fredag, Lördag, Söndag }