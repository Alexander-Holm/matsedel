<script lang="ts">
    import { Days, type Week } from "../models/Week";
    import * as Fakedata from "../fakedata"
    import RecipePreview from "../components/RecipePreview.svelte";
    import { onMount } from "svelte";
    import { Api } from "../models/api/Api";

    let isLoading = true;
    let weeks: Week[];

    onMount(async () => {
        // weeks uppdateras varje gång store från Api ändras
        const unsubscribe = Api.subscribe(store => weeks = store);
        if(weeks == null) await Api.weeks.getAll();
        isLoading = false;
        await loadPreviews();
        return unsubscribe;
    })

    // Hämtar linkPreviews för recepten en vecka i taget
    async function loadPreviews(i = 0){
        const week = weeks[i];
        if(week == null) return;

        // Hämtar endast preview om receptet inte redan har någon
        const recipesWithoutPreview: Promise<void>[] = [];
        week.days.forEach(day => day.recipes.forEach(recipe => {
            if(recipe.linkPreview == null){
                const promise = Api.linkPreview.get(recipe);
                recipesWithoutPreview.push(promise);
            }
        }));
        await Promise.all(recipesWithoutPreview);    

        const nextWeek = weeks[i + 1]
        if(nextWeek != null)
            loadPreviews(i + 1);
    }

    async function addWeek(){
        const weekName = prompt("Namn på vecka");
        if(weekName !== null)
            await Api.weeks.add(weekName);
    }
    async function editWeek(week: Week){
        const newName = prompt("Nytt namn", week.name);
        if(newName != null){
            await Api.weeks.rename(week.id, newName);
        }
    }
    async function deleteWeek(week: Week){
        let shouldDelete = true;
        // Måste bekräfta för att ta bort om veckan har recept
        if(week.days.length > 0){
            const message = 
                "Vill du ta bort den här veckan?\n"+
                "Alla recept som hör till den här veckan kommer också att tas bort."
            shouldDelete = confirm(message);
        }
        if(shouldDelete) 
            await Api.weeks.delete(week.id);
    }
    
</script>

<main>
    <h1>Matsedel</h1>
    {#if isLoading}
        <p>Laddar</p>
    {:else}

    <button on:click={addWeek} >+ Vecka</button>    
    {#each weeks as week}
    <div>
        <div class="week-header">
            <h2>{week.name}</h2>
            <button on:click={() => editWeek(week)}>Edit</button>
            <button on:click={() => deleteWeek(week)}>Delete</button>
        </div>
        <div class="week-recipes">
            {#each week.days as day}
                <div class="day">
                    <h3>{Days[day.key]}</h3>
                    <div class="day-recipes">
                        {#each day.recipes as recipe}
                            <RecipePreview recipe={recipe} />                        
                        {/each}
                    </div>                       
                </div>
            {/each}
            <a href={`recept/ny?vecka=${week.id}`}>+ Recept</a>
        </div>
    </div>
    {/each}

    {/if}
</main>

<style>
    .week-header{
        display: flex;
        align-items: center;
        gap: 20px;
    }
    .week-header h2{
        margin-right: auto;
    }

    .week-recipes{
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 2rem;
    }
    .day{
        display: contents;
    }
    h3{
        grid-column: 1;
        background-color: lightblue;
    }
    .day-recipes{
        grid-column: 2;
        background-color: lightpink;
    }
</style>