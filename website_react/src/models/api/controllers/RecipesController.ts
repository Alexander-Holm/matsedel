import { Controller } from "./Controller";
import { Recipe, type RecipeDto } from "../../Recipe";
import { Api } from "../Api";

export class RecipesController extends Controller{
    async add(recipeDto: RecipeDto){
        const method = "POST";
        const options = {
            method,
            body: JSON.stringify(recipeDto),
            headers: { "content-type": "application/json" }
        }
        const res = await fetch(this._apiUrl, options);
    }
    async delete(id: number){
        const method = "DELETE";
        const res = await fetch(this._apiUrl + id, {method});
    }
}