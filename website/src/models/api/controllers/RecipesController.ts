import { Controller } from "./Controller";
import { Recipe, type RecipeDto } from "../../Recipe";

export class RecipesController extends Controller{
    async get(id: number){
        const method = "GET";
        const res = await fetch(this._apiUrl + id, {method});
        const data = await res.json() as RecipeDto;
        return new Recipe(data);
    }
    async add(recipeDto: RecipeDto, apiKey: string){
        const method = "POST";
        const options = {
            method,
            body: JSON.stringify(recipeDto),
            headers: { 
                "content-type": "application/json",
                "api-key": apiKey
            }
        }
        const response = await fetch(this._apiUrl, options);
        this.validateResponse(response);
    }
    async delete(id: number, apiKey: string){
        const method = "DELETE";
        const options = {
            method,
            headers: { "api-key": apiKey }
        }
        const response = await fetch(this._apiUrl + id, options);
        this.validateResponse(response);
    }
    async update(recipe: RecipeDto, apiKey: string){
        const method = "PUT";
        const url = this._apiUrl + recipe.id;
        const options = {
            method,
            body: JSON.stringify(recipe),
            headers: { 
                "content-type": "application/json",
                "api-key": apiKey
            }
        }
        const response = await fetch(url, options);
        this.validateResponse(response);
    }
}