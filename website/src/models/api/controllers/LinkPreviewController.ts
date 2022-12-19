import type { LinkPreview, Recipe } from "src/models/Recipe";
import { Controller } from "./Controller";

export class LinkPreviewController extends Controller{
    async get(recipe: Recipe){
        try{
            // Använder URL konstruktorn för att testa om this.url är i ett giltigt format.
            // Går in i catch om det inte är en riktig länk.
            const recipeUrl = new URL(recipe.url);
            // Måste ta bort vissa tecken för att kunna skicka receptets url
            const encodedUrl =  encodeURIComponent(recipeUrl.href)
            const res = await fetch(this._apiUrl + encodedUrl);
            recipe.linkPreview = await res.json() as LinkPreview;
        }
        catch{
            recipe.linkPreview = {
                title: recipe.url,
                description: "",
                imageUrl: "/default-image.webp",
            }
        }
        finally{
            // Det finns ingenting som garanterar att recipe hör till en week som finns i _store.
            // Men på grund av hur datan hämtas bör recipe alltid göra det.
            // Notifiera att _store har ändrats.
            this._store.update(weeks => weeks)
        }
    }
}