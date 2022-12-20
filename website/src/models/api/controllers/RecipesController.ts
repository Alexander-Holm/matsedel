import { Controller } from "./Controller";
import { get } from "svelte/store";
import { Recipe, type RecipeDto } from "../../Recipe";
import { Api } from "../Api";

export class RecipesController extends Controller{
    async getById(id: number){
        let recipe : Recipe | undefined;
        const weeks = get(this._store);
        if(weeks != null){
            for (const week of weeks) {
                recipe = week.recipes.find(recipe => recipe?.id === id);
                if(recipe != null) break;
            }
        }
        else {
            let res = await fetch(this._apiUrl + id);
            if(res.ok){
                let data = await res.json();
                recipe = new Recipe( data as RecipeDto );
                await Api.linkPreview.get(recipe);
            }
        }
        
        return recipe;
    }
}