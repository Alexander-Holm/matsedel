import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Api } from "../models/api/Api";
import { Day, Days } from "../models/Week"
import RecipeCard from "./RecipeCard";
import styles from "./WeekCard.module.css";
import { ReactComponent as Edit } from "../icons/edit.svg";
import { ReactComponent as Delete } from "../icons/delete.svg";
import { usePasswordPrompt } from "./PasswordPrompt";

interface props{
    id: number,
    name: string,
    days: Day[],

    animationDelayMs: number,
    loadPreviews: boolean,
    onPreviewsLoaded: () => void,
    onDelete: (id: number) => void
}

export default function WeekCard( props: props ){
    // Måste använda destructuring för dependency arrays i useEffect och useCallback
    const { loadPreviews, onPreviewsLoaded } = props;
    const [name, setname] = useState(props.name);
    // days innehåller recepten
    const [days, setDays] = useState(props.days);
    const passwordPrompt = usePasswordPrompt();

    const fetchPreviews = useCallback( async () => {
        const updatedDays = [...days];
        const fetchRequests = [];
        for (const day of updatedDays) {
            for (const recipe of day.recipes) {
                const promise = async () => {
                    recipe.linkPreview = await Api.linkPreview.get(recipe);
                }
                fetchRequests.push(promise());
            }
        }
        await Promise.all(fetchRequests);
        setDays(updatedDays);
        onPreviewsLoaded();
    }, [days, onPreviewsLoaded])

    useEffect(() => {
        if(loadPreviews) 
            fetchPreviews();
    }, [loadPreviews, fetchPreviews])


    async function editWeek(presetName: string = name){
        let apiKey = Api.key.get();
        apiKey ??= await passwordPrompt.show();
        if(apiKey === null) return;

        const newName = window.prompt("Nytt namn", presetName);
        if(newName === null) return;

        try{
            await Api.weeks.rename(props.id, newName, apiKey);
            setname(newName);
        }
        catch(error){
            // Sätter presetName till input-namnet för att man inte ska behöva
            // skriva det nya namnet igen vid fel lösenord.
            const onRetry = () => editWeek(newName);
            Api.handleErrors(error, onRetry);
        }
    }

    async function deleteWeek(){
        let apiKey = Api.key.get();
        apiKey ??= await passwordPrompt.show();
        if(apiKey === null) return;
        
        let shouldDelete = true;
        // Måste bekräfta för att ta bort om veckan har recept
        if(props.days.length > 0){
            const message = 
                "Vill du ta bort den här veckan?\n"+
                "Alla recept som hör till den här veckan kommer också tas bort!"
            shouldDelete = window.confirm(message);
        }
        if(shouldDelete) {
            try{
                await Api.weeks.delete(props.id, apiKey);
                props.onDelete(props.id);
            }
            catch(error){
                Api.handleErrors(error, deleteWeek);
            }
        }
    }

    return(
        <>
        <article className={styles.weekCard} style={{animationDelay: props.animationDelayMs + "ms"}}>

            <header className={styles.weekHeader}>
                <h2>Vecka {name}</h2>
                <button className={styles.edit} onClick={() => editWeek()}><Edit/></button>
                <button className={styles.delete} onClick={deleteWeek}><Delete/></button>
            </header>

            <div className={styles.weekContent}>
                {days.map(day => (
                    <div className={styles.day} key={day.key}>

                        <div className={styles.dayHeader}>
                            <span className={styles.decoration}>
                                <span className={styles.dot} />
                            </span>
                            {/* Namn på dagen */}
                            <h3>{Days[day.key]}</h3>
                        </div>

                        <div className={styles.dayRecipes}>
                            {day.recipes.map(recipe => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))}
                        </div>
                    </div>
                ))}
                <Link className={styles.addRecipe + " button-primary"}  to={`recept/ny?vecka-id=${props.id}`}>
                    Lägg till recept
                </Link>
            </div>

        </article>
        </>
    )
}