import { Controller } from "./Controller";
import { Recipe, type RecipeDto } from "../../Recipe";

export class RecipesController extends Controller{
    async get(id: number){
        const method = "GET";
        const res = await fetch(this._apiUrl + id, {method});
        const data = await res.json() as RecipeDto;
        return new Recipe(data);
    }
    async add(recipeDto: RecipeDto){
        const method = "POST";
        const options = {
            method,
            body: JSON.stringify(recipeDto),
            headers: { "content-type": "application/json" }
        }
        await fetch(this._apiUrl, options);
    }
    async delete(id: number){
        const method = "DELETE";
        await fetch(this._apiUrl + id, {method});
    }
    async update(recipe: RecipeDto){
        const method = "PUT";
        const url = this._apiUrl + recipe.id;
        const options = {
            method,
            body: JSON.stringify(recipe),
            headers: { "content-type": "application/json" }
        }
        await fetch(url, options);
    }
}