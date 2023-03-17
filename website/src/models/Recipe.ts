export class RecipeDto  {
    id?: number;
    url!: string;
    notes?: string;
    day!: number;
    weekId!: number;
}
export class Recipe extends RecipeDto {
    linkPreview?: LinkPreview;
    constructor(recipeDto: RecipeDto){
        super();
        this.id = recipeDto.id;
        this.url = recipeDto.url;
        this.notes = recipeDto.notes;
        this.day = recipeDto.day;
        this.weekId = recipeDto.weekId;
        this.linkPreview = undefined;
    }
}
export type LinkPreview = {
    title: string,
    description: string,
    imageUrl: string
}