import { Controller } from "./Controller";
import { get } from "svelte/store";
import { Recipe, type RecipeDto } from "../../Recipe";
import { Api } from "../Api";
import type { Week } from "src/models/Week";

// OBS. uppdaterar inte store,
// lägg till senare om det behövs
export class RecipesController extends Controller{
    // Hämtar receptet från store om det finns där,
    // annars hämtar med fetch()
    async getById(id: number){
        let recipe = this.#findRecipeInStore(id)
        if(recipe == null)
            recipe = await this.#fetchRecipe(id);
        if(recipe != null && recipe.linkPreview == null)
            await Api.linkPreview.get(recipe);
        
        return recipe;
    }
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
        this._store.update(weeks => {
            for (const week of weeks) {
                for (const day of week.days) {
                    const index = day.recipes.findIndex(recipe => recipe.id == id);
                    if(index !== -1){
                        day.recipes.splice(index, 1);
                        return weeks;
                    }
                }
            }
            return weeks;
        })
    }

    #findRecipeInStore(id: number){
        const store = get(this._store);
        for (const week of store) {
            for (const day of week.days) {
                for (const recipe of day.recipes) {
                    if(recipe.id === id)
                        return recipe;
                }
            }
        }
        return null;
    }
    async #fetchRecipe(id: number){
        const res = await fetch(this._apiUrl + id);
        if(res.ok){
            const data = await res.json();
            return new Recipe( data as RecipeDto );                
        }
        else return null;
    }
}