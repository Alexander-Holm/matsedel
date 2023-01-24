import { useEffect, useState } from "react";
import { Api } from "../models/api/Api";
import { Recipe, RecipeDto } from "../models/Recipe";
import { Days, Week } from "../models/Week";
import "./RecipeForm.css"

interface Props{ 
    title: string,
    recipe?: Recipe,
    weekId: number,
    editWeek: boolean,
    handleSubmit: (recipe: RecipeDto) => void
}
export default function RecipeForm(props: Props){
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

    const [weeks, setWeeks] = useState<Week[]>();
    useEffect(() => {
        if(props.editWeek)
            Api.weeks.getAll().then(weeks => setWeeks(weeks));
    },[props.editWeek])

    async function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        const newRecipe = {
            id: props.recipe?.id,
            url: data.get("url") as string,
            notes: data.get("notes") as string | undefined,
            day: data.get("day") as unknown as number,
            weekId: props.weekId
        } as RecipeDto
        props.handleSubmit(newRecipe);
    }
        
    return(
        <form onSubmit={handleSubmit} >
            <h2>{props.title}</h2>            

            <label htmlFor="url">Länk</label>
            <input id="url" name="url" type="text" defaultValue={props.recipe?.url} required />

            {props.editWeek && (
                <>
                <label htmlFor="week-select">Vecka</label>
                <div className="animated-select">
                    {weeks ?(
                        <select id="week-select" name="week-select" defaultValue={props.weekId} >
                            {weeks.map(week => (
                                <option key={week.id} value={week.id} >{week.name}</option>
                                ))}
                        </select>
                    )   
                    :( // Visas när weeks laddas
                        <span className="loading-indicator">
                            <span style={{animationDelay: "0"}}>.</span>
                            <span style={{animationDelay: "100ms"}} >.</span>
                            <span style={{animationDelay: "200ms"}}>.</span>
                        </span>
                    )
                }
                </div>
                </>
            )}

            <fieldset className="days">
                <legend>Dag</legend>
                {days.map( ([name, number]) => (                    
                    <span key={number}>
                        <input id={name} name="day" value={number} type="radio" defaultChecked={number === props.recipe?.day} required/>
                        <label htmlFor={name} className="day-button">{name}</label>
                    </span>
                ))}
            </fieldset>

            <label htmlFor="notes">Anteckningar</label>
            <textarea id="notes" name="notes" defaultValue={props.recipe?.notes} />

            <button type="submit" className="submit button-primary" >Spara</button>

        </form>
    )
}