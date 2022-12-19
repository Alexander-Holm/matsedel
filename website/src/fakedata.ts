import type { LinkPreview } from "./models/Recipe";
import { Week } from "./models/Week";

export function fetchWeeks(){
    const fakeApiData: Week[] = [
        new Week( { 
            id: 1, 
            name: "vecka 1", 
            recipes: [
                { id: 1, url: "https://www.koket.se/pasta-salsiccia-classico", notes: "Torkade örter istället för färska", day: 1, weekId: 1},
                { id: 2, url: "https://www.tasteline.com/recept/mork-chokladtryffel-med-lingon/", day: 2, weekId: 1},
                { id: 2, url: "https://www.ica.se/recept/creme-caramel-med-saffran-729634/", day: 4, weekId: 1},
            ] 
        } ),
        new Week( {
            id: 2, 
            name: "vecka 2", 
            recipes: [
                { id: 3, url: "https://www.koket.se/pasta-salsiccia-classico", day: 0, weekId: 2},
                { id: 4, url: "https://www.tasteline.com/recept/mork-chokladtryffel-med-lingon/", day: 3, weekId: 2},
            ] 
        } ),
    ];
    return fakeApiData;
}

export const fakePreview: LinkPreview = {
    title: "Pasta Salsiccia Classico",
    description: "Kramig och mild pastasås på tomat, grädde och färsk salsiccia. En av Per Morbergs pastaklassiker!",
    imageUrl: "https://img.koket.se/standard-mega/pasta-salsiccia-classico.jpg.webp"
};