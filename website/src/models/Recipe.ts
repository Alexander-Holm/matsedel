export type RecipeDto = {
    id: number,
    url: string,
    notes: string,
    day: number,
    weekId: number,
}
export class Recipe {
    id: number;
    url: string;
    notes: string;
    linkPreview: LinkPreview;
    constructor(recipeDto: RecipeDto){
        this.id = recipeDto.id;
        this.url = recipeDto.url;
        this.notes = recipeDto.notes;
        this.linkPreview = null;
    }
    async fetchLinkPreview(){
        const apiUrl =  "https://matsedel-api.onrender.com/api/linkpreview/";
        try{
            const url = new URL(this.url);
            const encodedUrl = new URL(url, apiUrl);
            console.log(new URL(this.url, apiUrl).href);
            //const encodedUrl = encodeURIComponent(url);
            const res = await fetch(encodedUrl.href);
            this.linkPreview = await res.json() as LinkPreview;
        }
        catch{
            this.linkPreview = {
                title: this.url,
                description: this.notes,
                imageUrl: "default-image.jpg",
            }
        }

    }
}
type LinkPreview = {
    title: string,
    description: string,
    imageUrl: string
}

export async function fetchLinkPreview(url: string){
    const apiUrl =  "https://matsedel-api.onrender.com/api/linkpreview/";
    const encodedUrl = encodeURIComponent(url);
    const res = await fetch(apiUrl + encodedUrl);
    const linkPreview = await res.json() as LinkPreview;
    return linkPreview;
}