import { Controller } from "./Controller";
import { type RecipeDto } from "../../Recipe";

export class RecipesController extends Controller{
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
}