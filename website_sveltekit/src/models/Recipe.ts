export type RecipeDto = {
    id?: number,
    url: string,
    notes?: string,
    day: number,
    weekId: number,
}
export class Recipe {
    id?: number;
    url: string;
    notes?: string;
    linkPreview?: LinkPreview;
    constructor(recipeDto: RecipeDto){
        this.id = recipeDto.id;
        this.url = recipeDto.url;
        this.notes = recipeDto.notes;
        this.linkPreview = undefined;
    }
}
export type LinkPreview = {
    title: string,
    description: string,
    imageUrl: string
}