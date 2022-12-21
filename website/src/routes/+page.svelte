<script lang="ts">
    import type { Week } from "../models/Week";
    import * as Fakedata from "../fakedata"
    import RecipePreview from "../components/RecipePreview.svelte";
    import { onMount } from "svelte";
    import { Api } from "../models/api/Api";

    export const Days = [
        ["måndag"],
        ["tisdag"], 
        ["onsdag"], 
        ["torsdag"], 
        ["fredag"], 
        ["lördag"], 
        ["söndag"]
    ]
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

        const apiCalls = [];
        // recipes arrayen kan ha flera index som är null.
        // Har ett recept redan preview behöver det inte hämtas igen.
        const recipesWithoutPreview = week.recipes.filter(recipe => recipe?.linkPreview == null);
        for (const recipe of recipesWithoutPreview) {
            const promise = Api.linkPreview.get(recipe);
            apiCalls.push(promise);
        }        
        await Promise.all(apiCalls);    

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
        const newName = prompt("Nytt namn");
        if(newName != null){
            await Api.weeks.rename(week.id, newName);
        }
    }
    async function deleteWeek(week: Week){
        let shouldDelete = true;
        let hasRecipes = false;
        for (const recipe of week.recipes) {
            if(recipe != null){
                hasRecipes = true;
                break;
            }
        }
        if(hasRecipes){
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
    <button on:click={addWeek} >+ Week</button>    
    {#each weeks as week}
        <div>
            <div class="week-header">
                <h2>{week.name}</h2>
                <button on:click={() => editWeek(week)}>Edit</button>
                <button on:click={() => deleteWeek(week)}>Delete</button>
            </div>
            <div>
                {#each Days as day, index}
                    <div>
                        <p>{day}</p>
                        {#if week.recipes[index]}                            
                            <RecipePreview recipe={week.recipes[index]} />
                        {:else}
                            <p>+</p>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    {/each}

    {/if}
</main>

<style>
</style>