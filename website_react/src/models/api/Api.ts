import { WeeksController } from "./controllers/WeeksController";
import { LinkPreviewController } from "./controllers/LinkPreviewController";
import { RecipesController } from "./controllers/RecipesController";

const baseUrl = "https://matsedel-api.onrender.com/api/";

export const Api = {
    weeks: new WeeksController(baseUrl + "weeks/"),
    recipes: new RecipesController(baseUrl + "recipes/"),
    linkPreview: new LinkPreviewController(baseUrl + "linkpreview/"),
}