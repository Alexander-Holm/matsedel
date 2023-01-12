import { FormEvent } from "react";
import { redirect, useNavigate, useSearchParams } from "react-router-dom"
import Header from "../../components/Header";
import { Api } from "../../models/api/Api";
import { RecipeDto } from "../../models/Recipe";
import { Days } from "../../models/Week";

export default function Ny(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const weekId = searchParams.get("vecka-id") as string;

    /*
        Typescript enums har formatet:
        0: Array [ "0", "Måndag" ]​
        1: Array [ "1", "Tisdag" ]​
        2: Array [ "Måndag", 0 ]​
        3: Array [ "Tisdag", 1 ]
    */
    const stupidTypescriptEnum = Object.entries(Days);
    /*
        Ta bort första halvan för att få endast 
        2: Array [ "Måndag", 0 ]​
        3: Array [ "Tisdag", 1 ]
    */
    const days = stupidTypescriptEnum.slice(stupidTypescriptEnum.length /2);

    async function handleSubmit(event:any){
        event.preventDefault();
        const data = new FormData(event.target)
        const url = data.get("url") as string;
        const notes = data.get("notes") as string | undefined;
        const day = data.get("day");
        const weekId = data.get("week");
        const recipe = {
            url,
            notes,
            day: Number(day),
            weekId: Number(weekId)
        } as RecipeDto;
        await Api.recipes.add(recipe);
        console.log("klar")
        navigate("/")
    }

    return(
        <>
        <Header />
        <form onSubmit={handleSubmit} >
            <h2>Lägg till recept</h2>
            <input type="hidden" name="week" value={weekId} />

            <label htmlFor="url">Länk</label>
            <input id="url" name="url" type="text" required />

            <label htmlFor="notes">Anteckningar</label>
            <textarea id="notes" name="notes" />

            <fieldset className="days">
                <legend>Dag</legend>
                {days.map( ([name, number]) => (                    
                    <span key={number}>
                        <input id={name} name="day" value={number} type="radio" required/>
                        <label htmlFor={name} className="day-button">{name}</label>
                    </span>
                ))}

            </fieldset>

            <button type="submit" className="button-primary" >Spara</button>
        </form>
        </>
    )
}