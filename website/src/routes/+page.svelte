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
        const unsubscribe = Api.subscribe(store => weeks = store)
        await Api.weeks.getAll();
        isLoading = false;
        await loadPreviews();
        return unsubscribe;
    })

    // Hämtar linkPreviews för recepten en vecka i taget
    async function loadPreviews(i = 0){
        const week = weeks[i];
        if(week == null) return;

        const apiCalls = [];
        // recipes arrayen kan ha flera index som är null
        const recipes = week.recipes.filter(recipe => recipe != null);
        for (const recipe of recipes) {
            const promise = Api.linkPreview.get(recipe);
            apiCalls.push(promise);
        }
        await Promise.all(apiCalls);

        const nextWeek = weeks[i + 1]
        if(nextWeek != null)
            loadPreviews(i + 1);
    }
    
</script>

<main>
    <h1>Matsedel</h1>
    {#if isLoading}
        <p>Laddar</p>
    {:else}
    <button on:click={() => Api.weeks.add("Add från hemsida")} >+ Week</button>    
    {#each weeks as week}
        <div>
            <h2>{week.name}</h2>
            <button on:click={() => Api.weeks.delete(week.id)}>Delete</button>
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