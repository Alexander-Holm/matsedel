import type { LinkPreview, Recipe } from "../../Recipe";
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
            return await res.json() as LinkPreview;
        }
        catch{
            const defaultPreview = {
                title: recipe.url,
                description: "",
                imageUrl: "/default-image.webp",
            }
            return defaultPreview;
        }
    }
}